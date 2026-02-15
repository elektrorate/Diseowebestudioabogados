import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import logoOnlex from "@/assets/08486880406d58026342a3b0d089b6479280a8ee.png";

export function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login (en producción usar Supabase Auth)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === "admin@onlex.pe" && credentials.password === "admin123") {
      localStorage.setItem("onlex_admin_auth", "true");
      toast.success("Inicio de sesión exitoso");
      navigate("/admin");
    } else {
      toast.error("Credenciales incorrectas");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <img 
            src={logoOnlex} 
            alt="ONLEX - Tu solución legal en línea" 
            className="h-24 w-auto"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-2xl text-center mb-2">Área de Administración</CardTitle>
          <CardContent className="text-center text-muted-foreground mb-8">
            Ingresa tus credenciales para acceder
          </CardContent>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              placeholder="admin@onlex.pe"
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Demo:</strong> admin@onlex.pe / admin123
          </p>
        </div>
      </Card>
    </div>
  );
}
