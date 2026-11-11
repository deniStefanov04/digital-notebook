// Връзка с елементите от HTML
const note = document.getElementById('note');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

// Зареждаме съществуващите страници от localStorage или започваме с 1 празен лист
let pages = JSON.parse(localStorage.getItem('notebook_pages')) || [''];
let currentPage = 0;

// Функция за визуализиране на текущата страница
function showPage() {
  note.value = pages[currentPage] || '';
  pageIndicator.textContent = `Страница ${currentPage + 1} от ${pages.length}`;
  prevBtn.disabled = currentPage === 0;
  note.focus();
}

// Запазване при писане
note.addEventListener('input', () => {
  pages[currentPage] = note.value;
  localStorage.setItem('notebook_pages', JSON.stringify(pages));
});

// Бутон "Следваща"
nextBtn.addEventListener('click', () => {
  // 1. Запазваме текущото написано
  pages[currentPage] = note.value;

  // 2. Ако сме на последния лист, добавяме нов празен лист
  if (currentPage === pages.length - 1) {
    pages.push('');
  }

  // 3. Минаваме на следващата страница
  currentPage++;
  localStorage.setItem('notebook_pages', JSON.stringify(pages));
  showPage();
});

// Бутон "Предишна"
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    pages[currentPage] = note.value;
    currentPage--;
    localStorage.setItem('notebook_pages', JSON.stringify(pages));
    showPage();
  }
});

// Първоначално зареждане
showPage();