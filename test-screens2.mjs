import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000');
await page.waitForTimeout(2000);

// Create room
await page.getByText('ルームを作る').click();
await page.waitForTimeout(500);
await page.fill('.input', 'テスト');
await page.getByText('ルームをつくる').click();
await page.waitForTimeout(3500); // wait for all bots to be ready

await page.screenshot({ path: '/tmp/lobby-ready.png' });

// Start game
await page.getByText('ゲームスタート').click({ force: true });
await page.waitForTimeout(1000);
await page.screenshot({ path: '/tmp/game-phase1.png' });

// Phase 1: theme reveal -> go to deal
await page.getByText('数字をくばる').click();
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/game-phase2-deal.png' });

// Phase 2: tap card to reveal
await page.locator('[style*="perspective"]').first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/game-deal-revealed.png' });

await browser.close();
console.log('done');
