(() => {
  const modal = document.getElementById('experienceModal');
  const serviceChoice = document.getElementById('serviceChoice');
  const input = document.getElementById('imageInput');
  const previewWrap = document.getElementById('previewWrap');
  const previewImage = document.getElementById('previewImage');
  const mockAnalyze = document.getElementById('mockAnalyze');
  const mockStatus = document.getElementById('mockStatus');
  if (!modal || !serviceChoice || !input || !previewWrap || !previewImage || !mockAnalyze || !mockStatus) return;

  const MAX_BYTES = 10 * 1024 * 1024;
  let selectedService = '照见';
  let objectUrl = null;

  const setStatus = (message, tone = 'normal') => {
    mockStatus.textContent = message;
    mockStatus.dataset.tone = tone;
  };

  const setService = (service) => {
    selectedService = service || '照见';
    serviceChoice.textContent = `当前服务：${selectedService}`;
  };

  const openExperience = (service = '照见') => {
    setService(service);
    setStatus('');
    if (!modal.open && typeof modal.showModal === 'function') modal.showModal();
  };

  const clearPreview = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
    input.value = '';
    previewImage.removeAttribute('src');
    previewWrap.hidden = true;
  };

  const acceptFile = (file) => {
    if (!file) return false;
    if (!file.type.startsWith('image/')) {
      setStatus('请选择图片文件。', 'error');
      return false;
    }
    if (file.size > MAX_BYTES) {
      setStatus('图片请控制在 10MB 以内。', 'error');
      return false;
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;
    previewWrap.hidden = false;
    setStatus('图片已载入。展示版不会上传你的图片。', 'success');
    return true;
  };

  /* 「进入体验 / 立即体验 / 服务卡片」→ 跳到真实后端页面。
   * 静态页只负责展示与跳转：注册、上传图片、出报告都由后端完成
   * （后端用安全 Cookie + CSRF 保护，静态页无法代替，也不该代替）。
   * 后端地址写在 config.js 里，换服务器/换域名时只改那一行。 */
  const goToBackend = (path) => {
    const cfg = window.HANYAN_CONFIG || {};
    const backend = String(cfg.backend || "").replace(/\/+$/, "");
    if (!backend) {
      setStatus(cfg.fallbackTip || "体验入口正在维护，请找客服要最新链接。", "error");
      return;
    }
    window.open(backend + (path || cfg.enterPath || "/"), "_blank", "noopener");
  };

  document.querySelectorAll('[data-open-experience]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      goToBackend((window.HANYAN_CONFIG || {}).enterPath || "/register");
    });
  });

  document.querySelectorAll('[data-service]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      // 服务卡片也先进注册/登录页：具体买哪一档在兑换与提交时选
      goToBackend((window.HANYAN_CONFIG || {}).enterPath || "/register");
    });
  });

  input.addEventListener('change', () => acceptFile(input.files && input.files[0]));

  const uploadBox = input.closest('.upload-box');
  if (uploadBox) {
    ['dragenter', 'dragover'].forEach((name) => uploadBox.addEventListener(name, (event) => {
      event.preventDefault();
      uploadBox.classList.add('is-dragging');
    }));
    ['dragleave', 'drop'].forEach((name) => uploadBox.addEventListener(name, (event) => {
      event.preventDefault();
      uploadBox.classList.remove('is-dragging');
    }));
    uploadBox.addEventListener('drop', (event) => {
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      acceptFile(file);
    });
  }

  mockAnalyze.addEventListener('click', () => {
    if (!objectUrl) {
      setStatus('请先选择一张图片。', 'error');
      return;
    }
    setStatus(`${selectedService}前端流程已验证；当前交付未连接真实 AI、订单或支付后端。`, 'success');
  });

  modal.addEventListener('click', (event) => {
    const card = modal.querySelector('.modal-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });

  modal.addEventListener('close', () => {
    setStatus('');
  });

  window.addEventListener('beforeunload', () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  });
})();
