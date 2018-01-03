import sublime
import sublime_plugin
import os
import sys
import subprocess
import locale

if os.name == 'nt':
    try:
        import _winreg
    except (ImportError):
        import winreg as _winreg
    from ctypes import windll, create_unicode_buffer

class NotFoundError(Exception):
    pass

def get_setting(key, default=None):
    settings = sublime.load_settings('RabbitVcs.sublime-settings')
    return settings

class RabbitVcsCommand(sublime_plugin.WindowCommand):
    def run(self, paths=[], parameters=None):
        sublime.error_message('RabbitVCS: Operation not permited')

    def get_path(self, paths):
        if paths:
            return paths[0]
        # DEV: On ST3, there is always an active view.
        #   Be sure to check that it's a file with a path (not temporary view)
        elif self.window.active_view() and self.window.active_view().file_name():
            return self.window.active_view().file_name()
        elif self.window.folders():
            return self.window.folders()[0]
        else:
            sublime.error_message('RabbitVCS: No place to execute action')
            return False

    def get_file_path(self, paths):
        return self.get_path(paths)

    def get_project_folder_path(self, paths):
        path = self.get_path(paths)
        if not path:
            return False

        folders = [x for x in self.window.folders() if path.find(x + os.sep) == 0][0:1]
        if isinstance(folders, list):
            if len(folders) > 0:
                return folders[0]
            else:
            	return path

        return folders

    def run_action(self, action, path):
        try:
            if not path:
                raise NotFoundError('The file open in the selected view has ' +
                    'not yet been saved')
            args = ['rabbitvcs', action, path]
            env = os.environ.copy()

            # Run our process
            subprocess.Popen(args, env=env)

        except (OSError) as exception:
            print(str(exception))
            sublime.error_message('RabbitVcs: The RabbitVcs was not found')
        except (Exception) as exception:
            sublime.error_message('RabbitVcs: ' + str(exception))


class RabbitVcsFileCommitCommand(RabbitVcsCommand):
    def run(self, paths=[], parameters=None):
        path = self.get_file_path(paths)
        if not path:
            return

        self.run_action('commit', path)

class RabbitVcsProjectCommitCommand(RabbitVcsCommand):
    def run(self, paths=[], parameters=None):
        path = self.get_project_folder_path(paths)
        if not path:
            return

        self.run_action('commit', path)

class RabbitVcsFileLogCommand(RabbitVcsCommand):
    def run(self, paths=[], parameters=None):
        path = self.get_file_path(paths)
        if not path:
            return

        self.run_action('log', path)

class RabbitVcsProjectLogCommand(RabbitVcsCommand):
    def run(self, paths=[], parameters=None):
        path = self.get_project_folder_path(paths)
        if not path:
            return

        self.run_action('log', path)