import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const menu_get = defineEventHandler(() => {
  try {
    const filePath = join(process.cwd(), "public/data/menu.json");
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load menu data"
    });
  }
});

export { menu_get as default };
//# sourceMappingURL=menu.get.mjs.map
