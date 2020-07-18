$(document).ready(_ => {
    $('input[data-mask][data-mask-placeholder="true"]').each((k, el) => {
        const $el = $(el);
        const mask = $el.data('mask');

        $el.attr('placeholder', mask);
    });
});