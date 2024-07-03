import signal
import sys
import threading
from tools.scheduler import scheduler
from django.apps import AppConfig

scheduler_thread = threading.Thread(target=scheduler.run_tasks, daemon=True)

def signal_handler(sig, frame):
    scheduler.stop_scheduler()
    scheduler_thread.join()

    sys.exit(0)

class SchedulerConfig(AppConfig):
    name = 'dormitoryBackend'

    def ready(self):
         if self.should_start_scheduler():
            from bills.views import updateBills

            scheduler.add_task(updateBills, hours=0, minutes=5)
            scheduler_thread.start()

    def should_start_scheduler(self):
        try:
            command = sys.argv[1]
            allowed_command = 'runserver'

            return command == allowed_command
        except IndexError:
            return False

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)