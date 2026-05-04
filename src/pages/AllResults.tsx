import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, GraduationCap, School, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AllResults() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"M" | "W">("M");

  useEffect(() => {
    const fetchAllResults = async () => {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setResults(data);
      if (error) console.error("Error fetching results:", error);
      setLoading(false);
    };

    fetchAllResults();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const { error } = await supabase
        .from("quiz_results")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setResults(prev => prev.filter(res => res.id !== id));
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete record");
    }
  };

  const filteredResults = useMemo(() => {
    return results.filter(res => {
      const section = res.class_name?.split("-")[1] || "";
      const isM = ["A", "B", "C", "D"].includes(section);
      const isW = ["E", "F", "G", "H"].includes(section);
      return mode === "M" ? isM : isW;
    });
  }, [results, mode]);

  return (
    <div className="min-h-screen bg-background p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Quiz
            </Link>
            <h1 className="font-display text-4xl font-extrabold text-foreground">Global Hall of Fame</h1>
            <p className="text-muted-foreground mt-2">All recorded teacher matches from students worldwide.</p>
          </div>
          
          <div className="flex p-1 bg-secondary/50 rounded-xl border border-border self-start">
            <button
              onClick={() => setMode("M")}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${mode === "M" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              M Results
            </button>
            <button
              onClick={() => setMode("W")}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${mode === "W" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              W Results
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Showing {mode} Mode Results
              </span>
              <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">
                {filteredResults.length} Matches
              </span>
            </div>

            {filteredResults.map((res) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-2xl bg-surface border border-border p-6 shadow-soft-sm hover:shadow-soft-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground">
                        {res.name} {res.surname}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          <School className="w-3.5 h-3.5" />
                          Class {res.class_name}
                        </span>
                        <span className="text-border">|</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(res.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-16 sm:pl-0">
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="font-display font-extrabold text-2xl text-primary">
                          {res.top_match}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                        {res.percentage}% Match Rate
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="p-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all ml-2"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredResults.length === 0 && (
              <div className="text-center py-20 rounded-[2rem] border-2 border-dashed border-border bg-secondary/20">
                <p className="text-muted-foreground font-display">No matches found for {mode} mode yet.</p>
              </div>
            )}
          </div>
        )}

        <footer className="mt-10 pb-6 text-center">
          <p className="font-display text-[0.55rem] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
            made by <span className="text-primary/70">selvi nisa</span> with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
}
