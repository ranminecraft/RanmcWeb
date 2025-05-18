const fs = require('fs-extra');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier-terser');
const { minify: minifyJS } = require('terser');
const cheerio = require('cheerio');

// 源目录＆目标目录
const SRC_DIR = path.resolve(__dirname);
const DIST_DIR = path.resolve(__dirname, 'dist');

// HTML 压缩配置
const htmlOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  minifyJS: true,
  minifyCSS: true,
};

// 压缩并写出一个 JS 文件
async function processJsFile(srcPath, distPath) {
  const code = await fs.readFile(srcPath, 'utf8');
  const result = await minifyJS(code, {
    // terser 自带默认压缩选项，你可以在这里按需定制
  });
  await fs.outputFile(distPath, result.code);
}

// 递归遍历一个目录，处理所有 .js 文件
async function processJsDir(srcDir, distDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const distPath = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      await processJsDir(srcPath, distPath);
    } else if (entry.isFile() && /\.js$/.test(entry.name)) {
      await processJsFile(srcPath, distPath);
    }
  }
}

// 处理单个 HTML：压缩并提取 `<script src>` 里的外链 JS
async function processHtml(filePath) {
  const rel = path.relative(SRC_DIR, filePath);
  const distHtmlPath = path.join(DIST_DIR, rel);

  const html = await fs.readFile(filePath, 'utf8');
  const $ = cheerio.load(html);

  // 压缩并写出所有被 <script src> 引用的 JS
  await Promise.all(
    $('script[src]')
      .toArray()
      .map(async el => {
        const src = $(el).attr('src');
        if (!src) return;
        const absSrc = path.resolve(path.dirname(filePath), src);
        const relSrc = path.relative(SRC_DIR, absSrc);
        const absDist = path.join(DIST_DIR, relSrc);
        if (await fs.pathExists(absSrc)) {
          await processJsFile(absSrc, absDist);
        }
      })
  );

  // 压缩 HTML
  const minified = await minifyHTML($.html(), htmlOptions);
  await fs.outputFile(distHtmlPath, minified);
}

async function run() {
  // 1. 清空 dist
  await fs.remove(DIST_DIR);

  // 2. 拷贝静态资源：css、img、constant（非 js 的 constant 如果有其他文件也会被一并拷贝）
  await Promise.all([
    fs.copy(path.join(SRC_DIR, 'css'), path.join(DIST_DIR, 'css')),
    fs.copy(path.join(SRC_DIR, 'img'), path.join(DIST_DIR, 'img')),
    fs.copy(path.join(SRC_DIR, 'constant'), path.join(DIST_DIR, 'constant')),
  ]);

  // 3. 压缩 src/js 和 src/constant 下所有 .js
  await Promise.all([
    processJsDir(path.join(SRC_DIR, 'js'), path.join(DIST_DIR, 'js')),
    processJsDir(path.join(SRC_DIR, 'constant'), path.join(DIST_DIR, 'constant')),
  ]);

  // 4. 遍历根目录下所有 .html，做 HTML+内嵌外链 JS 处理
  const rootEntries = await fs.readdir(SRC_DIR);
  for (const name of rootEntries) {
    if (name.endsWith('.html')) {
      await processHtml(path.join(SRC_DIR, name));
    }
  }

  console.log('✅ 完成：所有 HTML/JS 已压缩，CSS、图片、constant 已拷贝至 dist/');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
