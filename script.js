const VALID_USER = "0000";
const VALID_PASS = "1111";
const VALOR_SESSAO = 150.00;

let selectedMood = '';
let selectedRating = 0;

let sessions = JSON.parse(localStorage.getItem('girassol_sessions')) || [
    {
        id: 1,
        type: 'Online (Google Meet)',
        date: '2026-10-25',
        time: '14:00',
        status: 'Pendente',
        notes: 'Acompanhamento inicial.'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    checkInitialState();
});

function initEvents() {
    const btnLandingLogin = document.getElementById('btnLandingLogin');
    const btnHeroAgendar = document.getElementById('btnHeroAgendar');
    const btnHeroConhecer = document.getElementById('btnHeroConhecer');
    const btnCtaLogin = document.getElementById('btnCtaLogin');
    const btnVoltarLanding = document.getElementById('btnVoltarLanding');

    if (btnLandingLogin) btnLandingLogin.onclick = showLoginScreen;
    if (btnHeroAgendar) btnHeroAgendar.onclick = showLoginScreen;
    if (btnCtaLogin) btnCtaLogin.onclick = showLoginScreen;
    if (btnVoltarLanding) btnVoltarLanding.onclick = showLandingPage;

    if (btnHeroConhecer) {
        btnHeroConhecer.onclick = () => {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        };
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const u = document.getElementById('loginUser').value.trim();
            const p = document.getElementById('loginPassword').value.trim();

            if (u === VALID_USER && p === VALID_PASS) {
                localStorage.setItem('girassol_auth', 'true');
                showAppPlatform();
            } else {
                showToast('Usuário ou senha inválidos! Digite 0000 e 1111.', 'danger');
            }
        };
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            localStorage.removeItem('girassol_auth');
            showLandingPage();
        };
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            showSection(target);
        };
    });

    const btnNavAgendar = document.getElementById('btnNavAgendar');
    if (btnNavAgendar) {
        btnNavAgendar.onclick = () => showSection('agendamento');
    }

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            const newSession = {
                id: Date.now(),
                type: document.getElementById('sessionType').value,
                date: document.getElementById('sessionDate').value,
                time: document.getElementById('sessionTime').value,
                notes: document.getElementById('notes').value,
                status: 'Pendente'
            };
            sessions.push(newSession);
            saveSessions();
            renderSessions();
            updateDashboard();
            bookingForm.reset();
            showToast('Sessão agendada com sucesso! 🌻', 'success');
            showSection('sessoes');
        };
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => navLinks.classList.toggle('active');
    }

    const btnOpenAvaliacao = document.getElementById('btnOpenAvaliacao');
    const btnCloseModal = document.getElementById('btnCloseModal');
    if (btnOpenAvaliacao) btnOpenAvaliacao.onclick = openModal;
    if (btnCloseModal) btnCloseModal.onclick = closeModal;

    document.querySelectorAll('#moodContainer .mood-btn').forEach(btn => {
        btn.onclick = () => {
            selectedMood = btn.getAttribute('data-mood');
            document.querySelectorAll('#moodContainer .mood-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        };
    });

    document.querySelectorAll('#ratingStars span').forEach(star => {
        star.onclick = () => {
            selectedRating = parseInt(star.getAttribute('data-star'));
            document.querySelectorAll('#ratingStars span').forEach((s, idx) => {
                s.classList.toggle('active', idx < selectedRating);
            });
        };
    });

    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        assessmentForm.onsubmit = (e) => {
            e.preventDefault();
            if (selectedMood) {
                document.getElementById('dashUltimoHumor').textContent = selectedMood;
                localStorage.setItem('girassol_ultimo_humor', selectedMood);
            }
            showToast('Obrigado pela sua avaliação! 🌻', 'success');
            closeModal();
        };
    }
}

function showLandingPage() {
    document.getElementById('landingPage').classList.remove('hidden');
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('appContainer').classList.add('hidden');
}

function showLoginScreen() {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('appContainer').classList.add('hidden');
}

function showAppPlatform() {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
    renderSessions();
    updateDashboard();
}

function checkInitialState() {
    if (localStorage.getItem('girassol_auth') === 'true') {
        showAppPlatform();
    } else {
        showLandingPage();
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    const targetSec = document.getElementById(sectionId);
    if (targetSec) targetSec.classList.add('active');

    const activeNav = document.querySelector(`.nav-item[data-target="${sectionId}"]`);
    if (activeNav) activeNav.classList.add('active');

    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('active');
}

function renderSessions() {
    const container = document.getElementById('sessionsList');
    if (!container) return;

    if (sessions.length === 0) {
        container.innerHTML = '<p class="subtitle">Nenhuma sessão agendada no momento.</p>';
        return;
    }

    container.innerHTML = sessions.map(s => `
        <div class="session-card ${s.status.toLowerCase()}">
            <div class="session-header">
                <span>${s.type}</span>
                <span class="status-tag">${s.status}</span>
            </div>
            <p><strong>📅 Data:</strong> ${formatDate(s.date)}</p>
            <p><strong>⏰ Horário:</strong> ${s.time}</p>
            ${s.notes ? `<p><strong>📝 Obs:</strong> ${s.notes}</p>` : ''}
            
            <div class="session-actions">
                ${s.status !== 'Cancelada' ? `
                    <button class="btn btn-success" onclick="updateStatus(${s.id}, 'Confirmada')">Confirmar</button>
                    <button class="btn btn-danger" onclick="updateStatus(${s.id}, 'Cancelada')">Cancelar</button>
                ` : '<span>Sessão cancelada</span>'}
            </div>
        </div>
    `).join('');
}

window.updateStatus = function(id, newStatus) {
    sessions = sessions.map(s => s.id === id ? { ...s, status: newStatus } : s);
    saveSessions();
    renderSessions();
    updateDashboard();
};

function updateDashboard() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const consultasMes = sessions.filter(s => {
        if (!s.date) return false;
        const [y, m] = s.date.split('-').map(Number);
        return (m - 1) === currentMonth && y === currentYear && s.status !== 'Cancelada';
    });

    const totalConsultas = consultasMes.length;
    const totalFinanceiro = totalConsultas * VALOR_SESSAO;

    const elConsultas = document.getElementById('dashConsultasMes');
    const elFinanceiro = document.getElementById('dashFinanceiro');
    const elProxima = document.getElementById('dashProximaConsulta');
    const elProximaData = document.getElementById('dashProximaData');
    const elUltimoHumor = document.getElementById('dashUltimoHumor');

    if (elConsultas) elConsultas.textContent = totalConsultas;
    if (elFinanceiro) elFinanceiro.textContent = `R$ ${totalFinanceiro.toFixed(2).replace('.', ',')}`;

    const savedHumor = localStorage.getItem('girassol_ultimo_humor');
    if (savedHumor && elUltimoHumor) {
        elUltimoHumor.textContent = savedHumor;
    }

    const proximas = sessions.filter(s => s.status !== 'Cancelada').sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (proximas.length > 0 && elProxima && elProximaData) {
        elProxima.textContent = proximas[0].type;
        elProximaData.textContent = `${formatDate(proximas[0].date)} às ${proximas[0].time}`;
    } else if (elProxima && elProximaData) {
        elProxima.textContent = 'Nenhuma';
        elProximaData.textContent = 'Agende para manter a rotina';
    }
}

function saveSessions() {
    localStorage.setItem('girassol_sessions', JSON.stringify(sessions));
}

function openModal() {
    document.getElementById('assessmentModal').classList.add('active');
}

function closeModal() {
    document.getElementById('assessmentModal').classList.remove('active');
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function showToast(message, type = 'success') {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.padding = '14px 24px';
        toast.style.borderRadius = '12px';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '2000';
        toast.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)';
        toast.style.transition = 'all 0.3s ease';
        document.body.appendChild(toast);
    }

    if (type === 'danger') {
        toast.style.backgroundColor = '#FEE2E2';
        toast.style.color = '#EF4444';
        toast.style.border = '1px solid #FCA5A5';
    } else {
        toast.style.backgroundColor = '#FEF08A';
        toast.style.color = '#854D0E';
        toast.style.border = '1px solid #FACC15';
    }

    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}