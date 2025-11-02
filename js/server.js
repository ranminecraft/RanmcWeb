// 在线玩家变化趋势
fetch("https://api.ranmc.cc/chart?type=tps")
  .then(res => res.json())
  .then(res => {
    if (res.code !== 200 || !res.data) return;

    // 解析数据
    const data = res.data.reverse(); // 时间顺序从早到晚
    const times = data.map(e => e.Time);
    const tpsValues = data.map(e => parseFloat(e.Value));
    const playerValues = data.map(e => parseInt(e.Player));

    const ctx = document.getElementById("onlineChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: times,
        datasets: [
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
            text: "在线玩家变化趋势"
          },
          legend: {
            position: "top"
          }
        }
      }
    });
  });
