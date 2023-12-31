from rest_framework import routers
from .api import (
    PersonasViewSet,
    UsuariosViewSet,
    PacienteViewSet,
    MedicoViewSet,
    FarmaceuticoViewSet,
    RolesViewSet,
    MedicamentoViewSet,
    RecetaViewSet,
    DetalleRecetaViewSet,
    LoginViewSet,
    RecetaCreateViewSet,
    DetalleRecetaCreateViewSet
)

router = routers.DefaultRouter()
router.register('api/login', LoginViewSet, 'login-list')
router.register('api/personas', PersonasViewSet, 'personas-list')
router.register('api/usuarios', UsuariosViewSet, 'usuarios-list')
router.register('api/paciente', PacienteViewSet, 'paciente-list')
router.register('api/medico', MedicoViewSet, 'medico-list')
router.register('api/farmaceutico', FarmaceuticoViewSet, 'farmaceutico-list')
router.register('api/roles', RolesViewSet, 'roles-list')
router.register('api/medicamento', MedicamentoViewSet, 'medicamento-list')
router.register('api/receta', RecetaViewSet, 'receta-list')
router.register('api/recetaCreate', RecetaCreateViewSet, 'recetaCreate-list')
router.register('api/detallereceta', DetalleRecetaViewSet, 'detallereceta-list')
router.register('api/detallerecetaCreate', DetalleRecetaCreateViewSet, 'detallerecetaCreate-list')

urlpatterns = router.urls