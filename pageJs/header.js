
document.writeln(`
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
        <!-- Text Logo - Use this if you don't have a graphic logo -->
        <!-- <a class="navbar-brand logo-text page-scroll" href="index.html">Aria</a> -->

        <!-- Image Logo -->
        <a class="navbar-brand logo-image" href="index.html"><img src="https://z3.ax1x.com/2021/01/14/sUds6x.png"
                alt="alternative"></a>

        <!-- Mobile Menu Toggle Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-awesome fas fa-bars"></span>
            <span class="navbar-toggler-awesome fas fa-times"></span>
        </button>
        <!-- end of mobile menu toggle button -->

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="index.html#header">首页</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="index.html#info">服务器介绍</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle page-scroll" href="./index.html#list" id="navbarDropdown"
                        role="button" aria-haspopup="true" aria-expanded="false">服务器列表</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="spigotserver.html"><span class="item-text">纯净生存 <script type="text/javascript" src="./pageJs/version.js"></script> </span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="modserver.html"><span class="item-text">模组空岛1.7.10</span></a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="index.html#picture">风景欣赏</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="news.html">游戏公告</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="banlist.html">封禁列表</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle page-scroll" id="navbarDropdown" role="button"
                        aria-haspopup="true" aria-expanded="false">友情外链</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="https://minecraft.net/"><span
                                class="item-text">Minecraft</span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="https://minepay.top/"><span class="item-text">MinePay</span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="https://minelive.top/"><span class="item-text">MineLive</span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="https://www.anzifan.com/"><span
                                class="item-text">AnZiFan</span></a>
                    </div>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="halloween.html">天地异变</a>
                </li>
                
            </ul>
        </div>
    </nav> <!-- end of navbar -->
    <!-- end of navbar -->
    `)