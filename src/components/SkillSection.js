const SkillSection = {
    name: 'SkillSection',
    template: `
        <section id="skills" class="ss-section fade-in">
        <!-- Section Title -->
                <h2 class="text-3xl lg:text-4xl text-center mb-16 fade-in-up">
                    <span class="font-light">My</span> <span class="font-bold">Skills</span>
                </h2>
            <div class="ss-grid">
                
                <div
                    v-for="skill in skills"
                    :key="skill.id"
                    class="ss-card"
                    :class="{ 'ss-card--inverted': skill.inverted }"
                >
                    <div class="ss-card__icon-wrap">
                        <img
                            :src="skill.icon"
                            :alt="skill.name"
                            class="ss-card__icon"
                            @error="onImgError($event, skill)"
                        />
                    </div>
                    <span class="ss-card__label">{{ skill.name }}</span>
                </div>
            </div>

            <!-- Certifications Sub-Section -->
            <div class="ss-certifications">
                <h3 class="ss-certifications__title">
                    <span class="font-light">My</span> <span class="font-bold">Certifications</span>
                </h3>
                <div class="ss-certifications__grid">
                    <a
                        v-for="cert in certifications"
                        :key="cert.id"
                        :href="cert.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ss-cert-card"
                    >
                        <div class="ss-cert-card__badge">
                            <svg class="ss-cert-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="8" r="6"/>
                                <path d="M9 14l-2 8 5-3 5 3-2-8"/>
                            </svg>
                        </div>
                        <div class="ss-cert-card__content">
                            <span class="ss-cert-card__name">{{ cert.name }}</span>
                            <span class="ss-cert-card__link">
                                View Certificate
                                <svg class="ss-cert-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                                </svg>
                            </span>
                        </div>
                        <div class="ss-cert-card__line"></div>
                    </a>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            skills: [
                // Updated paths to include 'src/' prefix for correct relative path from index.html
                { id: 1,  name: 'React', icon: 'src/assets/images/skills/reactjs.svg',        inverted: false  },
                { id: 2,  name: 'Next.Js', icon: 'src/assets/images/skills/nextjs.svg',        inverted: true },
                { id: 3,  name: 'JavaScript',     icon: 'src/assets/images/skills/js.svg',       inverted: false },
                { id: 4,  name: 'CSS',  icon: 'src/assets/images/skills/css.svg',      inverted: false },
                { id: 5,  name: 'HTML',    icon: 'src/assets/images/skills/html.svg',    inverted: false },
                { id: 6,  name: 'Git',  icon: 'src/assets/images/skills/git.svg', inverted: false },
                { id: 7,  name: 'Wordpress',        icon: 'src/assets/images/skills/wp.svg',       inverted: false },
                { id: 8,  name: 'Elementor',  icon: 'src/assets/images/skills/elementor.svg',  inverted: false },
                { id: 9,  name: 'Figma',    icon: 'src/assets/images/skills/figma.svg',   inverted: false },
                
            ],
            certifications: [
                { 
                    id: 1, 
                    name: 'UI/UX Design Professional', 
                    url: 'https://example.com/cert/ui-ux-design' 
                },
                { 
                    id: 2, 
                    name: 'Advanced Figma Masterclass', 
                    url: 'https://example.com/cert/figma-masterclass' 
                },
                { 
                    id: 3, 
                    name: 'Adobe Creative Suite Expert', 
                    url: 'https://example.com/cert/adobe-expert' 
                },
                { 
                    id: 4, 
                    name: 'Product Design Fundamentals', 
                    url: 'https://example.com/cert/product-design' 
                },
            ],
        };
    },
    methods: {
        onImgError(event, skill) {
            // Generate an SVG placeholder with the skill's initials when icon path is missing
            const initials = skill.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
            const bg = skill.inverted ? '%23000000' : '%23ffffff';
            const fg = skill.inverted ? '%23ffffff' : '%23000000';
            event.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='${bg}'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-weight='700' font-size='22' fill='${fg}'%3E${initials}%3C/text%3E%3C/svg%3E`;
        },
    },
    mounted() {
        // Inject component styles once into <head> to keep template clean
        if (document.getElementById('ss-styles')) return;
        const style = document.createElement('style');
        style.id = 'ss-styles';
        style.textContent = `
            .ss-section {
            background: rgb(255, 255, 255);
            padding: 60px 30px;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }

            /* ── Grid ─────────────────────────────────────────── */
            .ss-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 40px;
            max-width: 900px;
            margin: 0 auto;
            }

            /* Tablet  641px – 1024px */
            @media (max-width: 1024px) and (min-width: 641px) {
            .ss-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            }
            }

            /* Mobile  ≤ 640px */
            @media (max-width: 640px) {
            .ss-section {
            padding: 40px 12px;
            }
            .ss-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            }
            }

            /* ── Card ─────────────────────────────────────────── */
            .ss-card {
            background: #ffffff;
            border: 2px solid #1a1a1a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px 12px 18px;
            gap: 12px;
            aspect-ratio: 1 / 1;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: default;
            user-select: none;
            }

            .ss-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 40px rgba(255, 255, 255, 0.07);
            }

            /* Inverted card – black bg, white border */
            .ss-card--inverted {
            background: #000000;
            border-color: #ffffff;
            }

            /* ── Icon ─────────────────────────────────────────── */
            .ss-card__icon-wrap {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            }

            .ss-card__icon {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0);
            pointer-events: none;
            }

            /* Flip to white on inverted cards */
            .ss-card--inverted .ss-card__icon {
            filter: brightness(0) invert(1);
            }

            /* ── Label ────────────────────────────────────────── */
            .ss-card__label {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.06em;
            color: #000000;
            text-align: center;
            line-height: 1.2;
            }

            .ss-card--inverted .ss-card__label {
            color: #ffffff;
            }

            /* ── Tablet overrides ─────────────────────────────── */
            @media (max-width: 1024px) and (min-width: 641px) {
            .ss-card {
            padding: 20px 10px 16px;
            gap: 12px;
            }
            .ss-card__icon-wrap {
            width: 36px;
            height: 36px;
            }
            .ss-card__label {
            font-size: 14px;
            }
            }

            /* ── Mobile overrides ─────────────────────────────── */
            @media (max-width: 640px) {
            .ss-card {
            padding: 18px 8px 14px;
            gap: 12px;
            }
            .ss-card__icon-wrap {
            width: 42px;
            height: 42px;
            }
            .ss-card__label {
            font-size: 18px;
            }
            }

            /* ═════════════════════════════════════════════════════
               CERTIFICATIONS SUB-SECTION
               ═════════════════════════════════════════════════════ */
            .ss-certifications {
            margin-top: 80px;
            padding-top: 60px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            }

            .ss-certifications__title {
            font-size: 28px;
            text-align: center;
            margin-bottom: 48px;
            color: #000000;
            letter-spacing: 0.02em;
            }

            .ss-certifications__grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            max-width: 900px;
            margin: 0 auto;
            }

            /* ── Certification Card ─────────────────────────────── */
            .ss-cert-card {
            position: relative;
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 24px 28px;
            background: #ffffff;
            border: 2px solid #000000;
            text-decoration: none;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            }

            .ss-cert-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background: #000000;
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 0;
            }

            .ss-cert-card:hover::before {
            width: 100%;
            }

            .ss-cert-card:hover {
            transform: translateY(-4px);
            box-shadow: 8px 12px 24px rgba(0, 0, 0, 0.15);
            }

            .ss-cert-card:hover .ss-cert-card__badge,
            .ss-cert-card:hover .ss-cert-card__content {
            color: #ffffff;
            }

            .ss-cert-card:hover .ss-cert-card__line {
            background: #ffffff;
            }

            .ss-cert-card:hover .ss-cert-card__link {
            color: #ffffff;
            }

            .ss-cert-card:hover .ss-cert-card__arrow {
            transform: translate(3px, -3px);
            stroke: #ffffff;
            }

            /* ── Badge ─────────────────────────────────────────── */
            .ss-cert-card__badge {
            position: relative;
            z-index: 1;
            width: 48px;
            height: 48px;
            min-width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000000;
            color: #ffffff;
            border-radius: 50%;
            transition: all 0.3s ease;
            }

            .ss-cert-card:hover .ss-cert-card__badge {
            background: #ffffff;
            color: #000000;
            }

            .ss-cert-card__icon {
            width: 24px;
            height: 24px;
            }

            /* ── Content ────────────────────────────────────────── */
            .ss-cert-card__content {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
            min-width: 0;
            transition: color 0.3s ease;
            }

            .ss-cert-card__name {
            font-size: 16px;
            font-weight: 700;
            color: #000000;
            line-height: 1.3;
            letter-spacing: 0.01em;
            transition: color 0.3s ease;
            }

            .ss-cert-card:hover .ss-cert-card__name {
            color: #ffffff;
            }

            .ss-cert-card__link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 500;
            color: #666666;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            transition: color 0.3s ease;
            }

            .ss-cert-card__arrow {
            width: 14px;
            height: 14px;
            stroke: #666666;
            transition: all 0.3s ease;
            }

            /* ── Decorative Line ────────────────────────────────── */
            .ss-cert-card__line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: #000000;
            transform: scaleX(0);
            transform-origin: left;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            }

            .ss-cert-card:hover .ss-cert-card__line {
            transform: scaleX(1);
            background: #ffffff;
            }

            /* ── Tablet Responsive ──────────────────────────────── */
            @media (max-width: 1024px) and (min-width: 641px) {
            .ss-certifications {
                margin-top: 60px;
                padding-top: 48px;
            }
            .ss-certifications__title {
                font-size: 24px;
                margin-bottom: 36px;
            }
            .ss-certifications__grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
            .ss-cert-card {
                padding: 20px 24px;
                gap: 16px;
            }
            .ss-cert-card__badge {
                width: 44px;
                height: 44px;
                min-width: 44px;
            }
            .ss-cert-card__icon {
                width: 22px;
                height: 22px;
            }
            .ss-cert-card__name {
                font-size: 15px;
            }
            }

            /* ── Mobile Responsive ──────────────────────────────── */
            @media (max-width: 640px) {
            .ss-certifications {
                margin-top: 48px;
                padding-top: 36px;
            }
            .ss-certifications__title {
                font-size: 22px;
                margin-bottom: 28px;
            }
            .ss-certifications__grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            .ss-cert-card {
                padding: 20px;
                gap: 16px;
            }
            .ss-cert-card__badge {
                width: 40px;
                height: 40px;
                min-width: 40px;
            }
            .ss-cert-card__icon {
                width: 20px;
                height: 20px;
            }
            .ss-cert-card__name {
                font-size: 15px;
            }
            .ss-cert-card__link {
                font-size: 11px;
            }
            }

            /* ── Animation on Load ──────────────────────────────── */
            @keyframes certFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
            }

            .ss-cert-card {
            animation: certFadeIn 0.6s ease forwards;
            opacity: 0;
            }

            .ss-cert-card:nth-child(1) { animation-delay: 0.1s; }
            .ss-cert-card:nth-child(2) { animation-delay: 0.2s; }
            .ss-cert-card:nth-child(3) { animation-delay: 0.3s; }
            .ss-cert-card:nth-child(4) { animation-delay: 0.4s; }
        `;
        document.head.appendChild(style);
    },
};

window.SkillSection = SkillSection; // Make globally available for registration in main.js