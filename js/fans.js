/* Gig-alert signup: a plain POST to the Mailchimp audience form (no backend, $0).
   Mailchimp's "signup thank-you page" is set to redirect back to /near/thanks/. */
(function () {
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Where did this visitor come from? utm_source/utm_medium/utm_content, else the referrer host.
  var q = new URLSearchParams(location.search), src = '';
  try {
    src = [q.get('utm_source'), q.get('utm_medium'), q.get('utm_content')].filter(Boolean).join('/') ||
          (document.referrer ? new URL(document.referrer).hostname : 'direct');
  } catch (e) { src = 'direct'; }
  var srcEl = document.getElementById('source'); if (srcEl) srcEl.value = src.slice(0, 80);

  var form = document.getElementById('fans-form'); if (!form) return;
  var msg = document.getElementById('form-msg');
  function say(t, err) { msg.textContent = t; msg.className = 'form-msg' + (err ? ' err' : ''); }

  form.addEventListener('submit', function (e) {
    var pref = (form.querySelector('input[name=CONTACT]:checked') || {}).value;
    var problem =
      !document.getElementById('consent').checked ? 'Please tick the box so we can email you.' :
      (!form.EMAIL.value || !form.EMAIL.checkValidity()) ? 'Please check your email address.' :
      !form.TOWN.value.trim() ? 'Which town or suburb are you near?' :
      (pref !== 'Email' && !form.PHONE.value.trim()) ? 'Add a mobile number so we can text you (or choose Email).' : '';
    if (problem) { e.preventDefault(); say(problem, true); return; }
    say('Sending…');
  });
})();
