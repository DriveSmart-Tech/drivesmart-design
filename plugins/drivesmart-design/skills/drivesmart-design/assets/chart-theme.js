/* ============================================================================
   DRIVESMART · Chart.js theme
   Pulls colors from the design-system :root tokens so charts match the UI.

   Load AFTER chart.js, BEFORE you create charts:
     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
     <script src="chart-theme.js"></script>

   Then use window.DS_CHART:
     new Chart(ctx, { type:'doughnut', data:{ datasets:[{ backgroundColor: DS_CHART.series }] } });
     // status colors:  DS_CHART.statusColor('paid')  -> success hex
   Defaults (font, text color, grid, tooltip) are applied globally on load.
   ============================================================================ */
(function () {
  if (typeof Chart === 'undefined') {
    console.warn('[drivesmart] Chart.js not found — load chart.js before chart-theme.js');
    return;
  }
  var css = getComputedStyle(document.documentElement);
  var v = function (name, fallback) { return (css.getPropertyValue(name).trim() || fallback); };

  var palette = {
    primary: v('--primary', '#9ecaff'),
    success: v('--success', '#2ee08f'),
    danger:  v('--danger',  '#ff7b86'),
    warning: v('--warning', '#f5b84e'),
    idle:    v('--idle',    '#a9a4f5'),
    neutral: v('--outline', '#89919d'),
    blue2:   v('--primary-container', '#2196f3')
  };

  var text2 = v('--on-surface-variant', '#bfc7d4');
  var text3 = v('--outline', '#89919d');
  var grid  = 'rgba(255,255,255,0.06)';
  var fontFamily = "Geist, ui-monospace, monospace";

  // status → token color (mirrors .status-chip--*)
  var statusMap = {
    paid: palette.success, unpaid: palette.danger, pending: palette.warning,
    cancelled: palette.neutral, dead_deal: palette.idle, dead: palette.idle
  };

  // global defaults
  Chart.defaults.color = text2;
  Chart.defaults.borderColor = grid;
  Chart.defaults.font.family = fontFamily;
  Chart.defaults.font.size = 12;
  if (Chart.defaults.plugins) {
    if (Chart.defaults.plugins.legend) {
      Chart.defaults.plugins.legend.labels.color = text2;
      Chart.defaults.plugins.legend.labels.usePointStyle = true;
      Chart.defaults.plugins.legend.labels.boxWidth = 8;
    }
    if (Chart.defaults.plugins.tooltip) {
      var t = Chart.defaults.plugins.tooltip;
      t.backgroundColor = 'rgba(20,24,30,0.95)';
      t.titleColor = v('--on-surface', '#dfe2ea');
      t.bodyColor = text2;
      t.borderColor = 'rgba(255,255,255,0.12)';
      t.borderWidth = 1;
      t.padding = 10;
      t.cornerRadius = 8;
      t.titleFont = { family: fontFamily, weight: '600' };
      t.bodyFont = { family: fontFamily };
    }
  }
  // axis grid + ticks (Chart.js v3/v4 scale defaults)
  ['scales'].forEach(function () {});
  Chart.defaults.scale = Chart.defaults.scale || {};

  function gradient(ctx, area, from, to) {
    var g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    g.addColorStop(0, from); g.addColorStop(1, to);
    return g;
  }

  window.DS_CHART = {
    palette: palette,
    // ordered series for multi-series charts (bar / doughnut)
    series: [palette.primary, palette.success, palette.warning, palette.danger, palette.idle, palette.neutral, palette.blue2],
    grid: grid,
    text2: text2,
    text3: text3,
    statusColor: function (status) { return statusMap[String(status).toLowerCase()] || palette.neutral; },
    // helper: build a vertical fade for area/line fills
    fade: gradient,
    // common scale options to spread into a chart's `options.scales.x`/`.y`
    axis: { grid: { color: grid, drawBorder: false }, ticks: { color: text3, font: { family: fontFamily, size: 11 } } }
  };
})();
