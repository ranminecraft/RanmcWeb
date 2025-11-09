function InitMainTable() {
  var queryUrl = 'https://api.ranmc.cc/banlist';
  $('#table').bootstrapTable({
    locale: 'zh-CN',
    url: queryUrl,
    method: 'GET',
    striped: true,
    pagination: true,
    sortable: true,
    sortOrder: "desc",
    sidePagination: "server",
    pageNumber: 1,
    pageSize: 30,
    pageList: [10, 20, 30, 50],
    search: false,
    showColumns: true,
    showRefresh: true,
    clickToSelect: true,
    uniqueId: "id",
    showToggle: true,
    cardView: false,
    detailView: false,

    responseHandler: function (res) {
      if (res.code === 200) {
        return {
          total: res.total,
          rows: res.data
        };
      } else {
        return {
          total: 0,
          rows: []
        };
      }
    },

    queryParams: function (params) {
      return {
        limit: params.limit,
        page: (params.offset / params.limit) + 1,
        sort: params.sort,
        sortOrder: params.order
      };
    },

    columns: [
      { field: 'id', title: '序号', align: 'center' },
      { field: 'player', title: '玩家', align: 'center' },
      { field: 'reason', title: '封禁缘由', align: 'center' },
      { field: 'banTime', title: '封禁时间', align: 'center', sortable: true },
      { field: 'releaseTime', title: '解禁时间', align: 'center' },
      { field: 'operator', title: '操作人', align: 'center' }
    ],

    onLoadError: function () {
      alert("数据加载失败！");
    }
  });
}

$(function() {
  InitMainTable();
});