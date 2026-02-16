import { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { Search, Eye, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  addConsultaComentario,
  Consulta,
  ConsultaEstado,
  deleteConsulta,
  getConsultas,
  updateConsultaEstado,
} from "../../data/consultas-store";

export function AdminConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultaId, setSelectedConsultaId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComentario, setNewComentario] = useState("");
  const [isSavingComentario, setIsSavingComentario] = useState(false);

  const loadConsultas = async () => {
    setIsLoading(true);
    try {
      const data = await getConsultas();
      setConsultas(data);
      if (data.length > 0 && !selectedConsultaId) setSelectedConsultaId(data[0].id);
      if (data.length === 0) setSelectedConsultaId(null);
    } catch {
      toast.error("No se pudieron cargar las consultas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadConsultas();
  }, []);

  const filteredConsultas = useMemo(
    () =>
      consultas.filter(
        (item) =>
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.asunto.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [consultas, searchTerm],
  );

  const selectedConsulta = filteredConsultas.find((item) => item.id === selectedConsultaId)
    || consultas.find((item) => item.id === selectedConsultaId)
    || null;

  const handleDelete = async (id: string) => {
    if (!confirm("Estas seguro de eliminar esta consulta?")) return;

    try {
      await deleteConsulta(id);
      const updated = consultas.filter((item) => item.id !== id);
      setConsultas(updated);
      if (selectedConsultaId === id) {
        setSelectedConsultaId(updated[0]?.id ?? null);
      }
      toast.success("Consulta eliminada");
    } catch {
      toast.error("No se pudo eliminar la consulta");
    }
  };

  const handleChangeStatus = async (id: string, estado: ConsultaEstado) => {
    try {
      await updateConsultaEstado(id, estado);
      setConsultas((prev) => prev.map((item) => (item.id === id ? { ...item, estado } : item)));
      toast.success("Estado actualizado");
    } catch {
      toast.error("No se pudo actualizar el estado");
    }
  };

  const handleAddComentario = async () => {
    if (!selectedConsulta) return;
    const texto = newComentario.trim();
    if (!texto) return;

    setIsSavingComentario(true);
    try {
      const comentario = await addConsultaComentario(selectedConsulta.id, texto);
      setConsultas((prev) =>
        prev.map((item) =>
          item.id === selectedConsulta.id
            ? { ...item, comentarios: [...(item.comentarios || []), comentario] }
            : item,
        ),
      );
      setNewComentario("");
      toast.success("Comentario agregado");
    } catch {
      toast.error("No se pudo guardar el comentario");
    } finally {
      setIsSavingComentario(false);
    }
  };

  const pendingCount = consultas.filter((item) => item.estado === "Pendiente").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl">Consultas</h1>
          <p className="text-muted-foreground">
            Gestiona las consultas recibidas desde el formulario web
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-lg">
          {pendingCount} pendientes
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar consultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Card className="max-h-[calc(100vh-300px)] overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando consultas...
              </div>
            ) : filteredConsultas.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No hay consultas</p>
            ) : (
              <div className="space-y-2">
                {filteredConsultas.map((consulta) => (
                  <button
                    key={consulta.id}
                    onClick={() => setSelectedConsultaId(consulta.id)}
                    className={`w-full rounded-lg p-4 text-left transition-colors ${
                      selectedConsulta?.id === consulta.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <p className="line-clamp-1 font-medium">{consulta.nombre}</p>
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
                    <p className="mb-1 line-clamp-1 text-sm opacity-80">{consulta.asunto || "Sin asunto"}</p>
                    <p className="text-xs opacity-60">
                      {new Date(consulta.fecha).toLocaleDateString("es-PE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6 lg:col-span-2">
          {selectedConsulta ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-2xl">{selectedConsulta.nombre}</h2>
                  <p className="text-muted-foreground">
                    {new Date(selectedConsulta.fecha).toLocaleDateString("es-PE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => void handleDelete(selectedConsulta.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid gap-4 rounded-lg bg-muted p-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Telefono</p>
                  <p>{selectedConsulta.telefono}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Email</p>
                  <p>{selectedConsulta.email || "No proporcionado"}</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-muted-foreground">Asunto</p>
                <p className="text-lg">{selectedConsulta.asunto || "Sin asunto"}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-muted-foreground">Mensaje</p>
                <div className="rounded-lg bg-muted p-4">
                  <p className="whitespace-pre-wrap">{selectedConsulta.mensaje}</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-muted-foreground">Estado de la consulta</p>
                <div className="flex gap-2">
                  <Button
                    variant={selectedConsulta.estado === "Pendiente" ? "default" : "outline"}
                    onClick={() => void handleChangeStatus(selectedConsulta.id, "Pendiente")}
                    size="sm"
                  >
                    Pendiente
                  </Button>
                  <Button
                    variant={selectedConsulta.estado === "Contactado" ? "default" : "outline"}
                    onClick={() => void handleChangeStatus(selectedConsulta.id, "Contactado")}
                    size="sm"
                  >
                    Contactado
                  </Button>
                  <Button
                    variant={selectedConsulta.estado === "Resuelto" ? "default" : "outline"}
                    onClick={() => void handleChangeStatus(selectedConsulta.id, "Resuelto")}
                    size="sm"
                  >
                    Resuelto
                  </Button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-muted-foreground">Comentarios del proceso</p>
                <div className="space-y-3">
                  {(selectedConsulta.comentarios || []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aun no hay comentarios.</p>
                  ) : (
                    (selectedConsulta.comentarios || []).map((comentario) => (
                      <div key={comentario.id} className="rounded-lg border border-border p-3">
                        <p className="text-xs text-muted-foreground">
                          {new Date(comentario.createdAt).toLocaleDateString("es-PE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="mt-1 whitespace-pre-wrap">{comentario.texto}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <Textarea
                    value={newComentario}
                    onChange={(e) => setNewComentario(e.target.value)}
                    rows={3}
                    placeholder="Escribe un comentario sobre el avance del caso..."
                  />
                  <Button
                    onClick={() => void handleAddComentario()}
                    disabled={isSavingComentario || !newComentario.trim()}
                    size="sm"
                  >
                    {isSavingComentario ? "Guardando..." : "Agregar comentario"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Eye className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Selecciona una consulta para ver los detalles</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
