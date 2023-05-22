sudoSlide(
    'main-slide',
    [
        {'maxWidth': 99999999999999, 'minWidth': 992, 'qtyItem': 1, 'nextItem': 1},
        {'maxWidth': 992, 'minWidth': 767, 'qtyItem': 1, 'nextItem': 1},
        {'maxWidth': 480, 'minWidth': 0, 'qtyItem': 1, 'nextItem': 1}
    ],
    true,true, false, 5000, 1, 0
);
sudoSlide(
    'thumnails-lists',
    [
        {'maxWidth': 600, 'minWidth': 0, 'qtyItem': 1, 'nextItem': 1},
    ],
    false,true, false, 5000, 1, 0, 1, 'data-thumnail',
    [
        {'maxWidth': 600, 'minWidth': 500, 'qtyItem': 6, 'nextItem': 1},
        {'maxWidth': 500, 'minWidth': 400, 'qtyItem': 5, 'nextItem': 1},
        {'maxWidth': 400, 'minWidth': 0, 'qtyItem': 4, 'nextItem': 1},
    ]
);