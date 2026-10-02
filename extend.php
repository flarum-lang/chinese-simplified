<?php
/*
 * This file is part of flarum-lang/chinese-simplified.
 *
 * Copyright (c) 2024 Golden.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Lang\ChineseSimplified\Frontend\AddFonts;

return [
    new Extend\LanguagePack(),

    (new Extend\Settings())
        ->default('flarum-lang-chinese-simplified.use_google_fonts', '0'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less')
        ->content(AddFonts::class),

    (new Extend\Frontend('forum'))
        ->content(AddFonts::class),
];
