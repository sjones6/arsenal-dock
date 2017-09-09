const register = function(router, HealthzController) {
    router.get("/api/healthz", HealthzController.get);
    router.post("/api/healthz", HealthzController.post);
}

register.Controller = "Healthz";

module.exports = register;