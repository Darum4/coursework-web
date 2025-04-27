const cache = {};

async function updateLang(lang) {
    document.cookie = `lang=${lang};path=/`;
    document.documentElement.lang = lang;
    document.documentElement.dataset.timestamp = Date.now();

    const select = document.getElementById('langSelect');
    if (select) select.value = lang;

    const translations = lang === 'ru' ? {} : cache[lang] || (await new Promise(r => {
        const s = document.createElement('script');
        s.src = `./languages/${lang}.js`;
        s.onload = () => r(cache[lang] = window[`translation_${lang}`] || {});
        s.onerror = () => r({});
        document.head.appendChild(s);
    }));

    document.querySelectorAll('[lang-attr]').forEach(el => {
        const key = el.getAttribute('lang-attr');
        el.dataset.ru = el.dataset.ru || el.textContent;
        el.textContent = lang === 'ru' ? el.dataset.ru : translations[key] || el.dataset.ru;
    });

    document.querySelectorAll('a[href]').forEach(a => {
        const url = new URL(a.href, location.href);
        url.searchParams.set('lang', lang);
        a.href = url.toString();
    });
}

function initLang() {
    const lang = (`; ${document.cookie}`.split('; lang=')[1]?.split(';')[0]) ||
    new URLSearchParams(location.search).get('lang') || 'ru';
    const select = document.getElementById('langSelect');
    if (select) select.onchange = () => updateLang(select.value);
    requestAnimationFrame(() => updateLang(lang));
}

addEventListener('DOMContentLoaded', initLang);
onpageshow = initLang;