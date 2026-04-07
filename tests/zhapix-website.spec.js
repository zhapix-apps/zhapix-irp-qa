// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://zhapix.github.io/zhapix-irp/';

test.describe('IRP Platform - Desktop Tests', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    // IRP_DT_TC_001 - Page title and URL
    test('IRP_DT_TC_001 - Verify page tab title and URL are correct', async ({ page }) => {
        //await expect(page).toHaveURL(/zhapix\.com\/irp/);
        await expect(page).toHaveTitle('Industry Readiness Program – Zhapix');
    });

    // IRP_DT_TC_002 - Zhapix logo visible
    test('IRP_DT_TC_002 - Verify Zhapix logo is visible in header', async ({ page }) => {
        const logo = page.locator('img[alt="Zhapix"]')
        await expect(logo).toBeVisible();
    });

    // IRP_DT_TC_003 - Login button visible
    test('IRP_DT_TC_003 - Verify Login button is visible in header', async ({ page }) => {
        const loginButton = page.getByText(/login/i);
        await expect(loginButton).toBeVisible();
    });

    // IRP_DT_TC_004 - Hero section headline and tagline
    test('IRP_DT_TC_004 - Verify Hero section headline and tagline are present and correctly spelled', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /industry readiness program/i })).toBeVisible();
        await expect(page.getByText(/ready to launch your journey into the IT world of your dreams/i)).toBeVisible();
    });

    // IRP_DT_TC_005 - About Company section
    test('IRP_DT_TC_005 - Verify About Company section content is accurate', async ({ page }) => {
        const aboutPara = page.locator('.about__para').filter({ hasText: /digital\s+interaction/i });
        await expect(aboutPara).toBeVisible();
    });

    // IRP_DT_TC_006 - Mentor profile details
    test('IRP_DT_TC_006 - Verify Mentor profile details are complete and accurate', async ({ page }) => {
        await expect(page.getByText(/Vijayan Thanigaivelu/i)).toBeVisible();
        await expect(page.getByText(/founder/i)).toBeVisible();
        await expect(page.getByText(/20\s*years/i)).toBeVisible();
        await expect(page.getByText(/wipro/i)).toBeVisible();
        await expect(page.getByText(/apple/i)).toBeVisible();
        await expect(page.getByText(/mastercard/i)).toBeVisible();
        const mentorPhoto = page.getByRole('img', { name: /mentor|vijayan/i });
        await expect(mentorPhoto).toBeVisible();
    });

    // IRP_DT_TC_007 - 5 benefit cards in Why Choose section
    test('IRP_DT_TC_007 - Verify all 5 benefit cards are present in Why Choose Zhapix IRP', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /office environment/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /dual certification/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /kpi-based recognition/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /flexible & inclusive/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /professional tools/i })).toBeVisible();
    });

    // IRP_DT_TC_008 - Fullstack 12 technologies
    test('IRP_DT_TC_008 - Verify Fullstack Development lists all 12 technologies', async ({ page }) => {
        const fullstackSection = page.locator('.spec__card').filter({
            hasText: /fullstack development with ai/i
        });
        const expectedTech = [
            'ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'HTML/CSS',
            'Javascript/Typescript', 'Playwright', 'Postman', 'Google Cloud', 'Github',
            'Nodemon', 'Storybook'
        ];
        for (const tech of expectedTech) {
            await expect(fullstackSection.getByText(new RegExp(tech, 'i'))).toBeVisible();
        }
    });

    // IRP_DT_TC_009 - Automation Testing 11 technologies
    test('IRP_DT_TC_009 - Verify Automation Testing lists all 11 technologies', async ({ page }) => {
        const automationSection = page.locator('.spec__card').filter({
            hasText: /automation testing/i
        });
        const expectedItems = [
            'E2E Testing', 'API Testing', 'Mobile Testing', 'Cypress',
            'Playwright', 'Browserstack', 'Postman', 'Appium', 'HTML/CSS/Javascript ',
            'WebdriverIO', 'Zoho Issue Tracker'
        ];
        for (const item of expectedItems) {
            await expect(automationSection.getByText(new RegExp(item, 'i'))).toBeVisible();
        }
    });

    // IRP_DT_TC_010 - Bootcamp pricing
    test('IRP_DT_TC_010 - Verify Bootcamp pricing shows Rs. 15,000 (+GST) with correct details', async ({ page }) => {
        const bootcampSection = page.locator('div').filter({
            has: page.getByRole('heading', { name: /bootcamp training/i })
        });
        await expect(bootcampSection.getByText(/15,000/i)).toBeVisible();
        await expect(bootcampSection.getByText(/\+\s*gst/i)).toBeVisible();
        await expect(bootcampSection.getByText(/2 months intensive bootcamp training/i)).toBeVisible(); await expect(bootcampSection.getByText(/live webinar/i)).toBeVisible();
        await expect(bootcampSection.getByText(/flexible payment/i)).toBeVisible();
    });

    // IRP_DT_TC_011 - 4 phases of Transformation Journey
    test('IRP_DT_TC_011 - Verify all 4 phases of Transformation Journey are present', async ({ page }) => {
        const journeySection = page.locator('div').filter({
            has: page.getByRole('heading', { name: /transformation journey/i })
        });
        await expect(journeySection.getByText(/phase\s*1/i)).toBeVisible();
        await expect(journeySection.getByText(/preliminary sessions/i)).toBeVisible();
        await expect(journeySection.getByText(/phase\s*2/i)).toBeVisible();
        await expect(journeySection.getByText(/bootcamp/i)).toBeVisible();
        await expect(journeySection.getByText(/phase\s*3/i)).toBeVisible();
        await expect(journeySection.getByText(/internship/i)).toBeVisible();
        await expect(journeySection.getByText(/phase\s*4/i)).toBeVisible();
        await expect(journeySection.getByText(/project extension/i)).toBeVisible();
    });

    // IRP_DT_TC_012 - FAQ section - 5 questions visible
    test('IRP_DT_TC_012 - Verify all 5 FAQ answers are complete and visible', async ({ page }) => {
        const faqSection = page.getByRole('heading', { name: /faq/i }).locator('..'); // get parent container of FAQ heading
        await expect(faqSection).toBeVisible();
        const faqQuestions = faqSection.getByRole('heading', { level: 3 });
        await expect(faqQuestions).toHaveCount(5);

        await expect(faqQuestions).toContainText([
            'Why is the cost of this program relatively lower?',
            'How is the IRP Program different from traditional programs?',
            'Is this zhapix teaching institute or an IT Company?',
            'Can I skip the Bootcamp if I already know the MERN stack?',
            'Does the IRP Program guarantee a stipend or job placement?'
        ]);

        const faqAnswers = faqSection.locator('p');
        await expect(faqAnswers).toHaveCount(5);
        await expect(faqSection.getByText(/irp\.contact@zhapix\.com/i)).toBeVisible();
    });

    // IRP_DT_TC_013 - Contact address
    test('IRP_DT_TC_013 - Verify contact address is correct and complete', async ({ page }) => {
        await expect(page.getByText(/173/)).toBeVisible();
        await expect(page.getByText(/tecci park/i)).toBeVisible();
        await expect(page.getByText(/sholinganallur/i)).toBeVisible();
        await expect(page.getByText(/600119/)).toBeVisible();
    });

    // IRP_DT_TC_014 - Email displayed correctly
    test('IRP_DT_TC_014 - Verify email address displayed correctly', async ({ page }) => {
        const emailLink = page.locator('.footer__text').getByRole('link', { name: /irp\.contact@zhapix\.com/i });
        await expect(emailLink).toBeVisible();
    });

    // IRP_DT_TC_015 - Phone number format
    test('IRP_DT_TC_015 - Verify phone number displayed in correct format', async ({ page }) => {
        await expect(page.getByText(/\+?91[-\s]?8148767584/)).toBeVisible();
    });

    // IRP_DT_TC_016 - All 3 images load without broken icons
    test('IRP_DT_TC_016 - Verify image count, correct images, and no broken icons', async ({ page }) => {

        const images = page.locator('img');
        const count = await images.count();

        // ✅ 1. Validate image count (update expected number)
        const expectedCount = 3; //  change based on actual page
        expect(count).toBe(expectedCount);

        // ✅ Expected images data (update based on actual app)
        const expectedImages = [
            { alt: 'Zhapix', file: 'logo' },
            { alt: 'Zhapix Office Building', file: 'building' },
            { alt: 'Vijayan Thanigaivelu', file: 'mentor' }
        ];

        // ✅ 2 & 3. Validate each expected image
        for (const imageData of expectedImages) {
            const img = page.getByAltText(imageData.alt, { exact: true });

            // Check visible
            await expect(img).toBeVisible();

            // Check not broken
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            expect(naturalWidth).toBeGreaterThan(0);

            // Check correct image loaded
            await expect(img).toHaveAttribute('src', new RegExp(imageData.file, 'i'));
        }
    });

    // IRP_DT_TC_017 - Copyright footer
    test('IRP_DT_TC_017 - Verify copyright footer shows correct year and text', async ({ page }) => {
        const footercopywirght = page.locator('.footer__copy');
        await expect(footercopywirght).toContainText(/copyright\s*©\s*2026\s*zhapix\s*™\s*\|\s*all rights reserved/i);
    });

    // IRP_DT_TC_018 - Fullstack and Automation cards side-by-side on desktop
      test('IRP_DT_TC_018 - Verify Fullstack and Automation Testing cards display side-by-side on desktop', async ({ page }) => {
        const fullstackCard = page.getByRole('heading', { name: /fullstack/i });
        const automationCard = page.getByRole('heading', { name: /automation testing/i });
        await expect(fullstackCard).toBeVisible();
        await expect(automationCard).toBeVisible();
    
        const fsBox = await fullstackCard.boundingBox();
        const atBox = await automationCard.boundingBox();
        expect(Math.abs(fsBox.y - atBox.y)).toBeLessThan(50); // same row
      });
    
      // IRP_DT_TC_019 - Transformation journey horizontal timeline on desktop
      test('IRP_DT_TC_019 - Verify 4-phase transformation journey renders as horizontal timeline', async ({ page }) => {
        const phase1 = page.getByText(/phase\s*1/i);
        const phase4 = page.getByText(/phase\s*4/i);
        await expect(phase1).toBeVisible();
        await expect(phase4).toBeVisible();
    
        const p1Box = await phase1.boundingBox();
        const p4Box = await phase4.boundingBox();
        expect(Math.abs(p1Box.y - p4Box.y)).toBeLessThan(80); // same horizontal row
      });
      
/*
    // IRP_DT_TC_020 - Login button navigates to login page
    
    test.only('IRP_DT_TC_020 - Verify Login button navigates to login page', async ({ page }) => {
        const loginButton = page.getByRole('link', { name: /login/i });
        await expect(loginButton).toBeVisible();
        await loginButton.click();
        await expect(page.getByRole('textbox', { name: /username|email/i })
            .or(page.getByRole('textbox', { name: /password/i }))).toBeVisible();
    });
    */

    // IRP_DT_TC_021 - Apply Now navigates to Zoho form
    test('IRP_DT_TC_021 - Verify Apply Now button navigates to Zoho application form', async ({ page, context }) => {
        const applyBtn = page.getByRole('button', { name: /apply now/i });
        await expect(applyBtn).toBeVisible();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            applyBtn.click(),
        ]);

        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
            await expect(newPage).toHaveURL(/forms\.zhapix\.com/);
        } else {
            await expect(page).toHaveURL(/forms\.zhapix\.com/);
        }
    });

    // IRP_DT_TC_022 - Zhapix logo links back to top
    test('IRP_DT_TC_022 - Verify Zhapix logo nav links to top of the page', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, 500));
        const logo = page.getByRole('link', { name: 'Zhapix Home' });
        await logo.click();
        await expect(page).toHaveURL(/zhapix\.github\.io\/zhapix-irp/);
        await expect(page).not.toHaveURL(/404/);
    });

    // IRP_DT_TC_023 - Email link opens mail client
    test('IRP_DT_TC_023 - Verify clicking email link opens mail client', async ({ page }) => {
        const emailLink = page.locator('.footer__text').getByRole('link', { name: /irp\.contact@zhapix\.com/i });
        await expect(emailLink).toBeVisible();
        const href = await emailLink.getAttribute('href');
        expect(href).toMatch(/^mailto:/i);
        expect(href).toContain('irp.contact@zhapix.com');
    });

    // IRP_DT_TC_024 - Phone tel: link works
    test('IRP_DT_TC_024 - Verify phone number tel: link works on desktop', async ({ page }) => {
        const phoneLink = page.locator('.footer__text').getByRole('link', { name: /8148767584/i });
        await expect(phoneLink).toBeVisible();
        const href = await phoneLink.getAttribute('href');
        expect(href).toMatch(/^tel:/i);
        expect(href).toContain('8148767584');
    });

    // IRP_DT_TC_025 - All internal links resolve without 404
    test('IRP_DT_TC_025 - Verify all internal links resolve without 404', async ({ page }) => {
        const links = page.getByRole('link');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
            const link = links.nth(i);
            const href = await link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                const response = await page.request.get(`https://www.zhapix.com${href}`);
                expect(response.status()).not.toBe(404);
                expect(response.status()).not.toBe(500);
            }
        }
    });

    // IRP_DT_TC_027 - Zoho application form loads and is interactive
    test('IRP_DT_TC_027 - Verify Zoho application form loads and is interactive', async ({ page, context }) => {
        const applyBtn = page.getByRole('button', { name: /apply now/i });
        const [formPage] = await Promise.all([
            context.waitForEvent('page'),
            applyBtn.click(),
        ]);

        const targetPage = formPage || page;
        await targetPage.waitForLoadState('domcontentloaded');
        await expect(targetPage.getByRole('heading', { name: /industry readiness/i })).toBeVisible();
        await expect(targetPage).not.toHaveURL(/404/);
    });

    // IRP_DT_TC_028 - Page scroll functionality
    test('IRP_DT_TC_028 - Verify page scroll functionality', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeGreaterThan(0);

        await page.evaluate(() => window.scrollTo(0, 0));
        const scrollYTop = await page.evaluate(() => window.scrollY);
        expect(scrollYTop).toBe(0);
    });

    // IRP_DT_TC_029 - Hover effects on Zhapix logo
    test('IRP_DT_TC_029 - Verify hover effects on Zhapix logo', async ({ page }) => {
        const logo = page.getByRole('link', { name: 'Zhapix Home' });
        await expect(logo).toBeVisible();
        await logo.hover();
        await expect(page.getByText('Zhapix IRP')).toBeVisible();
    });
});