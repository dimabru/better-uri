import { INestApplication } from "@nestjs/common";
import { Route, ValidateDuplicatesResponse } from "./types";

export namespace BetterUri {
  export function validateDuplicates(
    app: INestApplication
  ): ValidateDuplicatesResponse {
    const server = app.getHttpServer();
    const router = server._events.request._router;

    const availableRoutes: Route[] = router.stack
      .map((layer: any) => {
        if (layer.route) {
          return {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          };
        }
      })
      .filter((item: any) => item !== undefined);

    const uniqueRoutes: string[] = [];
    const duplicateRoutes: string[] = [];

    availableRoutes
      .map((ar: Route) => `${ar.method} ${ar.path}`)
      .forEach((fullRoute: string) => {
        if (uniqueRoutes.includes(fullRoute)) {
          duplicateRoutes.push(fullRoute);
        } else {
          uniqueRoutes.push(fullRoute);
        }
      });

    return {
      isValid: duplicateRoutes.length > 0 ? false : true,
      duplicates: duplicateRoutes,
    };
  }
}
