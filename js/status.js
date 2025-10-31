// 纪念套装销售统计
$(function() {
  $.get('https://api.ranmc.cc/status?type=season', function(res) {
    if (res.code === 200 && res.rows) {
      const labels = Object.keys(res.rows);
      const data = Object.values(res.rows);
      const ctx = document.getElementById('seasonChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '销售数量',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: '数量' }
            },
            x: {
              title: { display: true, text: '纪念套装' }
            }
          },
          plugins: {
            legend: { display: false },
            title: { display: true, text: '纪念套装销售统计' }
          }
        }
      });
    }
  });
});

// TPS 与在线玩家变化趋势
fetch("https://api.ranmc.cc/status?type=tps")
  .then(res => res.json())
  .then(res => {
    if (res.code !== 200 || !res.rows) return;

    // 解析数据
    const rows = res.rows.reverse(); // 时间顺序从早到晚
    const times = rows.map(e => e.Time);
    const tpsValues = rows.map(e => parseFloat(e.Value));
    const playerValues = rows.map(e => parseInt(e.Player));

    const ctx = document.getElementById("tpsChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "TPS",
            data: tpsValues,
            yAxisID: "y1",
            borderColor: "rgba(54,162,235,1)",
            backgroundColor: "rgba(54,162,235,0.3)",
            tension: 0.3,
            fill: false
          },
          {
            label: "玩家数",
            data: playerValues,
            yAxisID: "y2",
            borderColor: "rgba(255,99,132,1)",
            backgroundColor: "rgba(255,99,132,0.3)",
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: "index", intersect: false },
        stacked: false,
        scales: {
          y1: {
            type: "linear",
            position: "left",
            title: { display: true, text: "TPS" },
            min: 0,
            max: 25
          },
          y2: {
            type: "linear",
            position: "right",
            title: { display: true, text: "玩家数" },
            grid: { drawOnChartArea: false }
          },
          x: {
            title: { display: true, text: "时间" }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "TPS 与在线玩家变化趋势"
          },
          legend: {
            position: "top"
          }
        }
      }
    });
  });

// PVP 段位统计
fetch("https://api.ranmc.cc/status?type=pvp")
  .then(res => res.json())
  .then(res => {
    if (res.code !== 200 || !res.rows) return;

    const labels = Object.keys(res.rows);
    const data = Object.values(res.rows);

    const ctx = document.getElementById("pvpChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "人数",
          data: data,
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "人数" }
          },
          x: {
            title: { display: true, text: "段位" }
          }
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: "PVP 段位统计" }
        }
      }
    });
  });
