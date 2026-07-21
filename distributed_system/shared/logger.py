import csv
import os
from datetime import datetime


class CommunicationLogger:
    def __init__(self, log_file):
        self.log_file = log_file
        self._create_file_if_needed()

    def _create_file_if_needed(self):
        """
        Create CSV file with header if it does not already exist.
        """
        if not os.path.exists(self.log_file):
            self.log_file.parent.mkdir(parents=True, exist_ok=True)

            with self.log_file.open("w", newline="") as file:
                writer = csv.writer(file)

                writer.writerow([
                    "timestamp",
                    "worker_id",
                    "endpoint",
                    "response_time_ms",
                    "message_size_bytes",
                    "status"
                ])

    def log(
        self,
        worker_id,
        endpoint,
        response_time_ms,
        message_size_bytes,
        status
    ):
        """
        Add one communication record.
        """

        with self.log_file.open("a", newline="") as file:

            writer = csv.writer(file)

            writer.writerow([
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                worker_id,
                endpoint,
                round(response_time_ms, 2),
                message_size_bytes,
                status
            ])