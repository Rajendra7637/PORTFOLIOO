$(document).ready(function() {

  const menuIcon = $(".menu_icon");
  const mobileMenu = $(".header ul");

  menuIcon.on('click touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenu.toggleClass("open");
  });

  // Scroll Progress Indicator & Back to Top controls
  const scrollProgress = $("#scroll-progress");
  const backToTopBtn = $("#backToTop");

  $(window).scroll(function() {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress.length) {
      scrollProgress.css("width", Math.min(100, Math.max(0, scrollPercent)) + "%");
    }

    if (scrollTop > 20) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    if (scrollTop > 350) {
      backToTopBtn.addClass("visible");
    } else {
      backToTopBtn.removeClass("visible");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  backToTopBtn.on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });
  
    $(".header ul li a").on("click", function(e) {
      var href = $(this).attr("href");
      if (!href) return;

      // Auto-close dropdown after selecting a section on phones.
      if (window.matchMedia('(max-width: 767px)').matches) {
        mobileMenu.removeClass("open");
      }

      var pathname = window.location.pathname;
      var currentPage = pathname.substring(pathname.lastIndexOf('/') + 1) || "index.html";
      if (!currentPage.endsWith(".html")) {
        currentPage = (currentPage === "" || currentPage === "/") ? "index.html" : currentPage + ".html";
      }

      // Case 1: Pure hash link (e.g. href="#home", href="#about", href="#projects", href="#certifications")
      if (href.startsWith("#")) {
        var $target = $(href);
        if ($target.length) {
          e.preventDefault();
          var offset = href === "#home" ? 0 : $target.offset().top - 40;
          $("html, body").animate({ scrollTop: offset }, 500);
          $(".header ul li a").removeClass("active");
          $(this).addClass("active");
        } else {
          // Section doesn't exist on current subpage; navigate to index.html with that hash
          window.location.href = "index.html" + href;
        }
        return;
      }

      // Case 2: Link contains page target (e.g. "index.html#home", "projects.html", "certifications.html")
      var parts = href.split("#");
      var targetFile = parts[0].substring(parts[0].lastIndexOf('/') + 1) || "index.html";
      var targetHash = parts[1] ? "#" + parts[1] : "";

      var isCurrentIndex = (currentPage === "index.html" || currentPage === "");
      var isCurrentProjects = currentPage.startsWith("project");
      var isCurrentCerts = currentPage.startsWith("certification");

      var isTargetIndex = (targetFile === "index.html" || targetFile === "");
      var isTargetProjects = targetFile.startsWith("project");
      var isTargetCerts = targetFile.startsWith("certification");

      // Clicking link to the CURRENT page:
      if ((isCurrentIndex && isTargetIndex) || (isCurrentProjects && isTargetProjects) || (isCurrentCerts && isTargetCerts)) {
        e.preventDefault();
        if (targetHash && $(targetHash).length) {
          var offset = targetHash === "#home" ? 0 : $(targetHash).offset().top - 40;
          $("html, body").animate({ scrollTop: offset }, 500);
          $(".header ul li a").removeClass("active");
          $(this).addClass("active");
        } else {
          $("html, body").animate({ scrollTop: 0 }, 500);
        }
        return;
      }

      // Case 3: Navigating to a DIFFERENT page (e.g. from projects.html to index.html#about or certifications.html)
      // Allow natural browser navigation without preventDefault!
    });

    $(document).click(function(e) {
      if (!$(e.target).closest('.header').length) {
        mobileMenu.removeClass('open');
      }
    });
  

    // Enhanced Responsive Scroll Animations with ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal({
        distance: "40px",
        duration: 900,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        delay: 100,
        reset: false
      });

      // Hero Elements
      sr.reveal(".profile-photo", { origin: "left", distance: "50px", delay: 150 });
      sr.reveal(".profile-text", { origin: "right", distance: "50px", delay: 200 });

      // About Section
      sr.reveal(".about-content", { origin: "left", distance: "40px", delay: 150 });
      sr.reveal(".about-skills", { origin: "right", distance: "40px", delay: 200 });

      // Section Titles
      sr.reveal(".project-title, .section-title", { origin: "top", distance: "30px", delay: 100 });

      // Projects (Staggered entrance with smooth scale)
      sr.reveal(".project", { origin: "bottom", distance: "50px", interval: 180, scale: 0.95 });

      // Certifications (Staggered cascade)
      sr.reveal(".certificate-card", { origin: "bottom", distance: "40px", interval: 120, scale: 0.96 });
    }

    // Interactive 3D Card Hover / Scroll Perspective on Desktop
    if (window.matchMedia('(min-width: 992px)').matches) {
      $(".project, .certificate-card").on("mousemove", function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 7;
        const rotateY = (x / rect.width) * 7;
        $(this).css({
          transform: "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) translateY(-8px)",
          boxShadow: "0 18px 40px rgba(0, 255, 255, 0.28)",
          borderColor: "aqua"
        });
      }).on("mouseleave", function() {
        $(this).css({
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          boxShadow: "",
          borderColor: ""
        });
      });
    }

  //contact form to excel sheet

  // Smooth scroll when landing on index.html with a hash from another page
  if (window.location.hash) {
    var $hashTarget = $(window.location.hash);
    if ($hashTarget.length) {
      setTimeout(function() {
        var offset = window.location.hash === "#home" ? 0 : $hashTarget.offset().top - 40;
        $("html, body").animate({ scrollTop: offset }, 600);
      }, 200);
    }
  }

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

    if (form && msg) {
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          msg.innerHTML = "Message sent successfully"
          setTimeout(function () {
            msg.innerHTML = ""
          }, 5000)
          form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })
    }
    
  });
  
  function updateActiveSection() {
    var pathname = window.location.pathname;
    var currentPage = pathname.substring(pathname.lastIndexOf('/') + 1) || "index.html";
    var isIndexPage = (currentPage === "" || currentPage === "/" || currentPage === "index.html");

    // Only dynamically update section highlight on index.html
    if (!isIndexPage || !$("section#about").length) {
      return;
    }

    var scrollPosition = $(window).scrollTop();
  
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home'], .header ul li a[href='index.html#home']").addClass("active");
      return;
    }
  
    $("section[id]").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 60 &&
        scrollPosition < offset + height - 60
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "'], .header ul li a[href='index.html#" + target + "']").addClass("active");
      }
    });
  }

// Certificate Modal Functions
function openModal(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('modalImage');
  
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Add blur effect to background
  document.body.style.overflow = 'hidden';
  document.querySelector('.certifications-section').style.filter = 'blur(5px)';
  
  // Show modal with animation
  modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('certificateModal');
  
  // Remove blur effect
  document.body.style.overflow = 'auto';
  document.querySelector('.certifications-section').style.filter = 'none';
  
  // Hide modal
  modal.classList.remove('show');
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
    closeProjectModal();
  }
});

// Project Modal Functions
function openProjectModal(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('projectModalImage');
  
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Add blur effect to background
  document.body.style.overflow = 'hidden';
  document.querySelector('.project-content').style.filter = 'blur(5px)';
  
  // Show modal with animation
  modal.classList.add('show');
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  
  // Remove blur effect
  document.body.style.overflow = 'auto';
  document.querySelector('.project-content').style.filter = 'none';
  
  // Hide modal
  modal.classList.remove('show');
}

function setMobileCertificationsHeight() {
  const certificationsGrid = document.querySelector('.certifications-grid');

  if (!certificationsGrid) {
    return;
  }

  const isPhoneView = window.matchMedia('(max-width: 768px)').matches;

  if (!isPhoneView) {
    certificationsGrid.style.removeProperty('--mobile-cert-visible-height');
    return;
  }

  const cards = certificationsGrid.querySelectorAll('.certificate-card');

  if (cards.length <= 3) {
    certificationsGrid.style.removeProperty('--mobile-cert-visible-height');
    return;
  }

  const gridStyles = window.getComputedStyle(certificationsGrid);
  const gapValue = gridStyles.rowGap || gridStyles.gap || '0';
  const gap = parseFloat(gapValue) || 0;

  let visibleHeight = 0;
  for (let i = 0; i < 3; i += 1) {
    visibleHeight += cards[i].offsetHeight;
  }

  visibleHeight += gap * 2;
  certificationsGrid.style.setProperty('--mobile-cert-visible-height', `${Math.ceil(visibleHeight)}px`);
}

function setupProjectReveal() {
  const projectSection = document.querySelector('.project-content');
  const projectGrid = document.querySelector('.projects');
  const loadMoreButton = document.getElementById('loadMoreProjects');
  const backdrop = document.getElementById('projectsBackdrop');

  if (!projectSection || !projectGrid || !loadMoreButton || !backdrop) {
    return;
  }

  const projects = Array.from(projectGrid.querySelectorAll('.project'));
  const hiddenProjects = projects.slice(3);

  if (hiddenProjects.length === 0) {
    loadMoreButton.style.display = 'none';
    return;
  }

  const closeProjectReveal = () => {
    projectSection.classList.remove('projects-expanded');
    backdrop.classList.remove('show');
    loadMoreButton.setAttribute('aria-expanded', 'false');
    loadMoreButton.querySelector('span').textContent = 'Load More Projects';
    loadMoreButton.querySelector('i').className = 'fa-solid fa-arrow-right';
    document.body.style.overflow = '';
  };

  loadMoreButton.addEventListener('click', () => {
    const isExpanded = projectSection.classList.toggle('projects-expanded');
    backdrop.classList.toggle('show', isExpanded);
    loadMoreButton.setAttribute('aria-expanded', String(isExpanded));
    loadMoreButton.querySelector('span').textContent = isExpanded
      ? 'Show Fewer Projects'
      : 'Load More Projects';
    loadMoreButton.querySelector('i').className = isExpanded
      ? 'fa-solid fa-arrow-up'
      : 'fa-solid fa-arrow-right';
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  });

  backdrop.addEventListener('click', closeProjectReveal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectSection.classList.contains('projects-expanded')) {
      closeProjectReveal();
    }
  });
}

window.addEventListener('load', setMobileCertificationsHeight);
window.addEventListener('resize', setMobileCertificationsHeight);
window.addEventListener('load', setupProjectReveal);