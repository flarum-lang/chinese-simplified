<?php
/*
 * This file is part of ffans/geetest.
 *
 * Copyright (c) 2024 Golden.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;

$extKey = 'flarum-lang-chinese-simplified';
$settings = resolve(SettingsRepositoryInterface::class);
$useGoogleFonts = $settings->get($extKey.'.use_google_fonts');

function is_mobile() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $mobile_agents = ['Mobile', 'Android', 'Silk/', 'Kindle', 'BlackBerry', 'Opera Mini', 'Opera Mobi'];

    foreach ($mobile_agents as $agent) {
        if (stripos($user_agent, $agent) !== false) {
            return true;
        }
    }
    return false;
}

$insertFonts = function (Document $document) use ($extKey) {
    if (!is_mobile()) {
        $document->head[] = '<link rel="stylesheet" href="/assets/extensions/'. $extKey .'/google-fonts/google-fonts.css">';
    }
};

$extensions = [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Flarum\Extend\LanguagePack,
];

if ($useGoogleFonts) {
    $extensions[] = (new Extend\Frontend('forum'))
        ->content(function (Document $document) use ($insertFonts) {
            $insertFonts($document);
        });

    $extensions[] = (new Extend\Frontend('admin'))
        ->content(function (Document $document) use ($insertFonts) {
            $insertFonts($document);
        });
}

return $extensions;
