import sublime, sublime_plugin

class RememberGotoAnything(sublime_plugin.EventListener): # Use EventListener
    VIEW_ID_GOTO_ANYTHING=2

    def on_modified(self, view): # This is called when a view is modified (text changed)
        if (view.id() == RememberGotoAnything.VIEW_ID_GOTO_ANYTHING): # Save content
            self.content = self.get_view_content(view)

    def on_activated_async(self, view): # This is called when a view is activated
        if view.id() == RememberGotoAnything.VIEW_ID_GOTO_ANYTHING and hasattr(self, 'content'): # Restore content if empty
            if not self.get_view_content(view):
                view.run_command('insert', {"characters":self.content})

    def get_view_content(self, view):
        return view.substr(sublime.Region(0, view.size()))