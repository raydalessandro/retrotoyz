import { test, expect } from '@playwright/test'

test.describe('RETROTOYZ', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    // Header or hero should show RETROTOYZ
    await expect(page.getByRole('heading', { name: /RETROTOYZ/i })).toBeVisible()
    // Check timeline section
    await expect(page.getByText('TIMELINE', { exact: false })).toBeVisible()
    // Check categories section
    await expect(page.getByText('CATEGORIE')).toBeVisible()
    // Check seed toys exist in the page (may be below viewport)
    await expect(page.getByText('He-Man').first()).toBeAttached()
  })

  test('navigate to catalog', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: /Esplora il catalogo/i }).click()
    await expect(page).toHaveURL(/catalogo/)
    await expect(page.getByRole('heading', { name: /CATALOGO/i })).toBeVisible()
    await expect(page.getByText('risultati')).toBeVisible()
  })

  test('search toys in catalog', async ({ page }) => {
    await page.goto('/catalogo', { waitUntil: 'networkidle' })
    await page.getByPlaceholder('Cerca per nome, brand o linea...').fill('He-Man')
    await page.getByRole('button', { name: 'Cerca', exact: true }).click()
    await expect(page.getByText('He-Man').first()).toBeVisible()
  })

  test('add toy to collection and view in cameretta', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    // Click heart on first toy card to add to collection
    const heartButton = page.locator('button[title*="Aggiungilo"]').first()
    await heartButton.click()
    // Verify heart is filled (has fill class)
    await expect(page.locator('.fill-neon-magenta').first()).toBeVisible()
    // Navigate to collection
    await page.goto('/collezione', { waitUntil: 'networkidle' })
    await expect(page.getByText('LA MIA CAMERETTA')).toBeVisible()
    // Should have at least one toy in the collection
    await expect(page.getByText('giocattol', { exact: false }).first()).toBeVisible()
  })

  test('collection page shows empty state', async ({ page }) => {
    // Clear localStorage to ensure empty collection
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      localStorage.removeItem('retrotoyz_collection')
    })
    await page.goto('/collezione', { waitUntil: 'networkidle' })
    await expect(page.getByText('LA MIA CAMERETTA')).toBeVisible()
    await expect(page.getByText('vuota', { exact: false }).first()).toBeVisible()
  })

  test('add toy via manual form', async ({ page }) => {
    await page.goto('/aggiungi', { waitUntil: 'networkidle' })
    await expect(page.getByText('AGGIUNGI GIOCATTOLO')).toBeVisible()
    // Fill the manual form
    await page.locator('input[name="name"]').fill('Test Robot')
    await page.locator('input[name="brand"]').fill('Test Brand')
    await page.locator('input[name="year"]').fill('1990')
    await page.locator('select[name="category"]').selectOption('action-figures')
    // Submit
    await page.getByRole('button', { name: /Aggiungi al catalogo/i }).click()
    // Should navigate to toy detail
    await expect(page).toHaveURL(/\/toy\//)
    await expect(page.getByText('Test Robot')).toBeVisible()
  })

  test('view toy detail page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    // Click on first toy card link
    await page.locator('a[href^="/toy/"]').first().click()
    await expect(page).toHaveURL(/\/toy\//)
    await expect(page.getByText('Torna al catalogo')).toBeVisible()
  })
})
