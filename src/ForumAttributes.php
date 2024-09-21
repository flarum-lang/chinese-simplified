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

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer, $model, array $attributes): array
    {

        $attributes['flarum-lang-chinese-simplified.reformat_time'] = $this->settings->get('flarum-lang-chinese-simplified.reformat_time') === '1';
        $attributes['flarum-lang-chinese-simplified.reformat_time_force'] = $this->settings->get('flarum-lang-chinese-simplified.reformat_time_force') === '1';


        return $attributes;
    }
}
