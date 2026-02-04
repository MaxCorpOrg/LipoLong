import { promises as fs } from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "data", "maintenance.json");

type MaintenanceState = {
  enabled: boolean;
  updatedAt?: string;
};

const DEFAULT_STATE: MaintenanceState = { enabled: true };

export async function getMaintenanceState(): Promise<MaintenanceState> {
  try {
    const raw = await fs.readFile(SETTINGS_PATH, "utf8");
    const parsed = JSON.parse(raw) as MaintenanceState;
    if (typeof parsed.enabled !== "boolean") {
      return DEFAULT_STATE;
    }
    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

export async function setMaintenanceEnabled(enabled: boolean): Promise<MaintenanceState> {
  const nextState: MaintenanceState = {
    enabled,
    updatedAt: new Date().toISOString(),
  };

  await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(nextState, null, 2), "utf8");
  return nextState;
}
