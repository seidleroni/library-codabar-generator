import React from 'react';

const Footer: React.FC = () => {
    // These values are injected by Vite's define option during the build process.
    // They default to 'dev' and 'local' for local development.
    const buildNumber = process.env.APP_BUILD_NUMBER;
    const commitSha = process.env.APP_COMMIT_SHA;

    const shortSha = commitSha?.substring(0, 7) ?? 'local';

    // The default values 'dev' and 'local' signal a local development build.
    const isDevBuild = buildNumber === 'dev' || commitSha === 'local';

    return (
        <footer className="w-full bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm py-3 px-4 md:px-8 text-xs text-slate-500 dark:text-slate-400 border-t border-blue-500/20 flex-shrink-0 
                         flex flex-col md:relative md:flex-row items-center justify-center gap-1 md:gap-4">
            
            {/* Centered content. */}
            <div className="text-center order-2 md:order-1">
                <span>© 2025 Jon Seidmann</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>MIT Licensed</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <a 
                    href="https://github.com/seidleroni/library-codabar-generator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    aria-label="View source code on GitHub"
                >
                    View on Github
                </a>
            </div>

            {/* Build info. Absolutely positioned on desktop. */}
            <div className="order-1 md:order-2 
                             md:absolute md:right-8 md:top-0 md:bottom-0 md:flex md:items-center">
                {isDevBuild ? (
                    <span>Development Build</span>
                ) : (
                    <span title={`Commit SHA: ${commitSha}`}>
                        Build #{buildNumber} &middot; {shortSha}
                    </span>
                )}
            </div>
        </footer>
    );
};

export default Footer;
