
document.addEventListener('DOMContentLoaded', () => {
    const lessonGrid = document.getElementById('lesson-grid');
    const lessonContainer = document.querySelector('.lesson-container');

    // Helper to get URL params
    const getParams = () => new URLSearchParams(window.location.search);

    // Initialize Index Page
    if (lessonGrid) {
        renderLessonGrid();
    }

    // Initialize Lesson Page
    if (lessonContainer) {
        const id = parseInt(getParams().get('id'));
        if (id) {
            const lesson = lessonsData.find(l => l.id === id);
            if (lesson) {
                renderLessonDetail(lesson);
            } else {
                alert('Lesson not found!');
                window.location.href = 'index.html';
            }
        } else {
            window.location.href = 'index.html';
        }
    }

    function renderLessonGrid() {
        lessonGrid.innerHTML = lessonsData.map(lesson => `
            <a href="lesson.html?id=${lesson.id}" class="lesson-card">
                <h2>${lesson.title}</h2>
                <p>${lesson.description}</p>
                <div class="card-footer">
                    <span><i class="fas fa-play-circle"></i> Xem hướng dẫn</span>
                    <span>${lesson.steps.length} bước</span>
                </div>
            </a>
        `).join('');
    }

    function renderLessonDetail(lesson) {
        // Metadata
        document.title = `${lesson.title} - Thực Hành Word`;
        document.getElementById('lesson-number').textContent = lesson.title.split(':')[0]; // "Bài 1"
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-desc').textContent = lesson.description;

        // Video
        const videoFrame = document.getElementById('lesson-video');
        videoFrame.src = lesson.video;

        // Resources
        const resourceList = document.getElementById('resource-list');
        const tasksHtml = lesson.tasks.map(t => `
            <a href="DeBaiThucHanh/${t.file}" class="resource-item" download>
                <i class="fas fa-file-word"></i> 
                <span>${t.name}</span>
            </a>
        `).join('');

        const docsHtml = lesson.docs.map(d => `
            <a href="TaiLieuHuongDan/${d.file}" class="resource-item" target="_blank">
                <i class="fas fa-file-pdf"></i>
                <span>${d.name}</span>
            </a>
        `).join('');

        resourceList.innerHTML = tasksHtml + docsHtml;

        // Steps
        const stepList = document.getElementById('step-list');
        stepList.innerHTML = lesson.steps.map((step, index) => `
            <div class="step-item">
                <div class="step-header">
                    <div class="step-title-wrapper">
                        ${step.icon ? `<i class="fas ${step.icon} step-icon-visual"></i>` : ''}
                        <span>${step.title}</span>
                    </div>
                    <i class="fas fa-chevron-down step-toggle-icon"></i>
                </div>
                <div class="step-content">
                    <p>${step.content}</p>
                    ${step.slideImage ? `
                        <div class="step-slide-container">
                            <span class="slide-label"><i class="fas fa-image"></i> Minh họa:</span>
                            <img src="${step.slideImage}" alt="Slide hướng dẫn" class="step-slide-img" loading="lazy">
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        // Accordion functionality
        const stepHeaders = document.querySelectorAll('.step-header');
        stepHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                item.classList.toggle('active');
            });
        });
    }
});
