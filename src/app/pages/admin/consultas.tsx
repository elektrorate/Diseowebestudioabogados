import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Search, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Consulta {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  asunto: string;
  mensaje: string;
  fecha: string;
  estado: "Pendiente" | "Contactado" | "Resuelto";
}

export function AdminConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      id: 1,
      nombre: "María González Pérez",
      telefono: "+51 987 654 321",
      email: "maria.gonzalez@email.com",
      asunto: "Pensión ONP denegada",
      mensaje: "Solicité mi pensión de jubilación hace 6 meses y la ONP me la denegó argumentando que no tengo suficientes años de aportes, pero yo trabajé más de 25 años.",
      fecha: "2026-02-15T10:30:00",
      estado: "Pendiente"
    },
    {
      id: 2,
      nombre: "Juan Carlos Pérez",
      telefono: "+51 912 345 678",
      email: "jc.perez@email.com",
      asunto: "Despido injustificado",
      mensaje: "Fui despedido sin causa justificada después de 5 años trabajando en la empresa. No me pagaron mis beneficios sociales completos.",
      fecha: "2026-02-14T15:45:00",
      estado: "Contactado"
    },
    {
      id: 3,
      nombre: "Ana María Rodríguez",
      telefono: "+51 998 765 432",
      email: "ana.rodriguez@email.com",
      asunto: "Multa municipal injusta",
      mensaje: "La municipalidad me puso una multa de S/ 5,000 por supuesta infracción que nunca cometí. Quiero impugnarla.",
      fecha: "2026-02-14T09:20:00",
      estado: "Pendiente"
    },
    {
      id: 4,
      nombre: "Roberto Silva Torres",
      telefono: "+51 945 678 901",
      email: "roberto.silva@email.com",
      asunto: "Reconocimiento de aportes",
      mensaje: "Necesito que se reconozcan mis años de aportes en una empresa donde trabajé hace 15 años.",
      fecha: "2026-02-13T11:15:00",
      estado: "Resuelto"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(null);

  const filteredConsultas = consultas.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.asunto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta consulta?")) {
      setConsultas(consultas.filter((c) => c.id !== id));
      if (selectedConsulta?.id === id) {
        setSelectedConsulta(null);
      }
      toast.success("Consulta eliminada");
    }
  };

  const handleChangeStatus = (id: number, newStatus: Consulta["estado"]) => {
    setConsultas(consultas.map((c) =>
      c.id === id ? { ...c, estado: newStatus } : c
    ));
    if (selectedConsulta?.id === id) {
      setSelectedConsulta({ ...selectedConsulta, estado: newStatus });
    }
    toast.success("Estado actualizado");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Consultas</h1>
          <p className="text-muted-foreground">
            Gestiona las consultas recibidas desde el formulario web
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {consultas.filter(c => c.estado === "Pendiente").length} pendientes
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de consultas */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar consultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Card className="p-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredConsultas.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay consultas
              </p>
            ) : (
              <div className="space-y-2">
                {filteredConsultas.map((consulta) => (
                  <button
                    key={consulta.id}
                    onClick={() => setSelectedConsulta(consulta)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedConsulta?.id === consulta.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium line-clamp-1">{consulta.nombre}</p>
                      <Badge
                        variant={
                          consulta.estado === "Pendiente"
                            ? "destructive"
                            : consulta.estado === "Contactado"
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {consulta.estado}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-80 line-clamp-1 mb-1">
                      {consulta.asunto}
                    </p>
                    <p className="text-xs opacity-60">
                      {new Date(consulta.fecha).toLocaleDateString('es-PE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Detalle de consulta */}
        <Card className="lg:col-span-2 p-6">
          {selectedConsulta ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl mb-1">{selectedConsulta.nombre}</h2>
                  <p className="text-muted-foreground">
                    {new Date(selectedConsulta.fecha).toLocaleDateString('es-PE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(selectedConsulta.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                  <p>{selectedConsulta.telefono}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p>{selectedConsulta.email || "No proporcionado"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Asunto</p>
                <p className="text-lg">{selectedConsulta.asunto}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Mensaje</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedConsulta.mensaje}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Estado de la consulta</p>
                <div className="flex gap-2">
                  <Button
                    variant={selectedConsulta.estado === "Pendiente" ? "default" : "outline"}
                    onClick={() => handleChangeStatus(selectedConsulta.id, "Pendiente")}
                    size="sm"
                  >
                    Pendiente
                  </Button>
                  <Button
                    variant={selectedConsulta.estado === "Contactado" ? "default" : "outline"}
                    onClick={() => handleChangeStatus(selectedConsulta.id, "Contactado")}
                    size="sm"
                  >
                    Contactado
                  </Button>
                  <Button
                    variant={selectedConsulta.estado === "Resuelto" ? "default" : "outline"}
                    onClick={() => handleChangeStatus(selectedConsulta.id, "Resuelto")}
                    size="sm"
                  >
                    Resuelto
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecciona una consulta para ver los detalles</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
