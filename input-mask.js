$(document).ready(_ => {
    $('input[data-mask][data-mask-placeholder="true"]').each((k, el) => {
        const $el = $(el);
        const mask = $el.data('mask');

        $el.attr('placeholder', mask);
    });
});

$('input[data-mask]').on('keydown', e => {
    const target = $(e.target);
    const key = e.key;
    const mask = target.data('mask');
    const scoreCount = (mask.match(/_/g) || []).length; // number of allowed chars

    let val = getRealValue(target.val() + (key.length === 1 ? key : ''));

    if (key === 'Backspace' && val.length > 0) {
        val = val.substr(0, val.length - 1);
        console.log(val);
    }

    if (val.length > scoreCount) return false;

    applyMask(val, mask, target);

    return false;
});

function applyMask(str, mask, target) {
    const nonChars = [...mask.matchAll(/[^_]/gi)].map(a => a.index);

    $(nonChars).each((k, i) => {
        if (str.length < i) return;

        str = shiftIn(str, i, mask.charAt(i));
    });

    target.val(str);
}

function getRealValue(str) {
    return str.replace(/[^a-z0-9]/gi, '');
}

function shiftIn(str, index, chr) {
    if (index > str.length - 1) return str;

    return str.substr(0, index) + chr + str.substr(index);
}