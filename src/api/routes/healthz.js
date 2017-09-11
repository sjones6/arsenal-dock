const register = function(router, HealthzController) {
    router.get("/api/healthz", HealthzController.get);
}

register.Controller = "Healthz";

module.exports = register;