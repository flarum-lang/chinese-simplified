<?php

namespace Flarum\Lang\ChineseSimplified\Frontend;

use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Filesystem\Factory;
use Psr\Http\Message\ServerRequestInterface;

class AddFonts
{
    public function __construct(
        private readonly SettingsRepositoryInterface $settings,
        private readonly Factory                     $filesystem,
    )
    {
    }

    public function __invoke(Document $document, ServerRequestInterface $request): void
    {
        if (!$this->settings->get('flarum-lang-chinese-simplified.use_google_fonts')) {
            return;
        }

        $userAgent = $request->getHeaderLine('User-Agent');

        foreach (['Mobile', 'Android', 'Silk/', 'Kindle', 'BlackBerry', 'Opera Mini', 'Opera Mobi'] as $agent) {
            if (stripos($userAgent, $agent) !== false) {
                return;
            }
        }

        $url = $this->filesystem->disk('flarum-assets')
            ->url('extensions/flarum-lang-chinese-simplified/google-fonts/google-fonts.css');

        $document->head[] = '<link rel="stylesheet" href="' . htmlspecialchars($url, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '">';
    }
}
