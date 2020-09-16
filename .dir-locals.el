((rjsx-mode . ((js-indent-level . 2)
               (create-lockfiles . nil)))
 (json-mode . ((js-indent-level . 2)
               (create-lockfiles . nil)))
 (js2-mode . ((js-indent-level . 2)
              (create-lockfiles . nil)))
 (mhtml-mode . ((js-indent-level . 2)
                (create-lockfiles . nil)))
 (scss-mode . ((create-lockfiles . nil)))
 (nil . ((eval . (progn
                   (dolist (v '("node_modules"
                                "bower_components"
                                ".sass_cache"
                                ".cache"
                                ".npm"))
                     (add-to-list 'grep-find-ignored-directories v))
                   (dolist (v '("*.min.js"
                                "*.bundle.js"
                                "*.min.css"
                                "*.json"
                                "*.log"))
                     (add-to-list 'grep-find-ignored-files v)))))))
