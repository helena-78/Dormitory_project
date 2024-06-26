from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Room Assignment Details', 0, 1, 'C')

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def add_room_info(self, room_number, room_price, student_id):
        self.set_font('Arial', '', 12)
        self.cell(0, 10, f'Room Number: {room_number}', 0, 1)
        self.cell(0, 10, f'Room Price: ${room_price}', 0, 1)
        self.cell(0, 10, f'Student ID: {student_id}', 0, 1)
        self.ln(10)