import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import logoOnlex from "@/assets/08486880406d58026342a3b0d089b6479280a8ee.png";

export function AdminAccess() {
  const [credentials, setCredentials] = useState({ usuario: "", clave: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (credentials.usuario === "admin" && credentials.clave === "testing123") {
      localStorage.setItem("onlex_admin_auth", "true");
      localStorage.setItem("onlex_admin_user", "admin");
      toast.success("Acceso concedido");
      navigate("/admin");
    } else {
      toast.error("Credenciales incorrectas");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 flex items-center justify-center">
          <img src={logoOnlex} alt="ONLEX - acceso admin" className="h-20 w-auto" />
        </div>

        <CardHeader>
          <CardTitle className="mb-2 text-center text-2xl">Acceso de Administracion</CardTitle>
          <CardContent className="mb-8 text-center text-muted-foreground">
            Ingresa para gestionar el sitio por categorias.
          </CardContent>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="usuario">Usuario</Label>
            <Input
              id="usuario"
              value={credentials.usuario}
              onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
              required
              placeholder="admin"
            />
          </div>

          <div>
            <Label htmlFor="clave">Clave</Label>
            <Input
              id="clave"
              type="password"
              value={credentials.clave}
              onChange={(e) => setCredentials({ ...credentials, clave: e.target.value })}
              required
              placeholder="********"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={isLoading}
          >
            {isLoading ? "Validando..." : "Ingresar"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
