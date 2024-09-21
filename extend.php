<?php
/*
 * This file is part of flarum-lang/chinese-simplified.
 *
 * Copyright (c) 2024 Golden.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FlarumLang\ChineseSimplified;

use Flarum\Extend;
use Flarum\Extend\LanguagePack;
use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Serializer\ForumSerializer;

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

$extends = [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    new LanguagePack,
];

if ($useGoogleFonts) {
    $extends[] = (new Extend\Frontend('forum'))
        ->content(function (Document $document) use ($insertFonts) {
            $insertFonts($document);
        });

    $extends[] = (new Extend\Frontend('admin'))
        ->content(function (Document $document) use ($insertFonts) {
            $insertFonts($document);
        });
}

return $extends;
