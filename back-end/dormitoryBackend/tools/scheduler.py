import time
import schedule

class Scheduler:
    def __init__(self):
        self.tasks = []
        self.enabled = True
    
    def add_task(self, task_function, hours=0, minutes=0):
        interval_seconds = hours * 3600 + minutes * 60
        self.tasks.append((task_function, interval_seconds))

    def run_tasks(self):
        print('Scheduler started!')

        for task_function, interval_hours in self.tasks:
            schedule.every(interval_hours).seconds.do(task_function)

        while self.enabled:
            schedule.run_pending()
            time.sleep(1)
    
    def stop_scheduler(self):
        self.enabled = False
            
scheduler = Scheduler()