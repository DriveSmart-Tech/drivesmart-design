/* ============================================================================
   DRIVESMART · count-up
   Animates any element with [data-count] from 0 → value when it scrolls into
   view. Dependency-free. Respects prefers-reduced-motion.

     <div class="metric" data-count="40231">0</div>
     <div class="metric" data-count="98.2" data-suffix="%" data-decimals="1">0</div>
     <div class="metric" data-count="2400000" data-prefix="$">0</div>
     <script src="count-up.js"></script>

   Attributes: data-count (required) · data-prefix · data-suffix · data-decimals
   ============================================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function format(n, decimals) {
    return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function run(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var set = function (v) { el.textContent = prefix + format(v, decimals) + suffix; };

    if (reduce) { set(target); return; }
    var dur = 1100, start = null;
    function tick(now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);           // easeOutCubic
      set(target * eased);
      if (t < 1) requestAnimationFrame(tick); else set(target);
    }
    requestAnimationFrame(tick);
  }

  function init() {
    var els = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  window.DSCountUp = init;   // expose so a "replay" control can re-run the count-up

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
