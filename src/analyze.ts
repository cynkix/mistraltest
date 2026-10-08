export async function analyze(
  _tender: string,
  onProgress?: (completedSteps: number) => void,
): Promise<void> {
  for (let step = 1; step <= 4; step += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, 900))
    onProgress?.(step)
  }
}

export async function writeDecisionNote(
  _avis: DecisionAvis,
  destinataire: Destinataire,
): Promise<string> {
  const cachedText = textesMistral[destinataire]
  const generatedText = new Promise<string>((resolve) => {
    window.setTimeout(() => resolve(cachedText), 450)
  })
  const fallback = new Promise<string>((resolve) => {
    window.setTimeout(() => resolve(cachedText), 8000)
  })

  return Promise.race([generatedText, fallback])
}
import { textesMistral } from "./mockData"
import type { DecisionAvis, Destinataire } from "./lib/note"
