import { Cpu, MapPin, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCreatorProfile } from "@/lib/projects";

export async function AboutSection() {
  const profile = await getCreatorProfile();

  return (
    <section id="about" className="scroll-mt-24 space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-cyan-200/80 uppercase">About</p>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Artist Profile
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">{profile.bioLong}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Card className="border-white/10 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">{profile.name}</CardTitle>
            <p className="text-sm text-zinc-300">{profile.roleTitle}</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-300">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5">
              <MapPin className="size-4 text-cyan-200" />
              {profile.location}
            </div>
            <Separator className="bg-white/10" />
            <p className="leading-6">{profile.bioShort}</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-white">
              <Cpu className="size-4 text-cyan-200" />
              Core Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} className="bg-white/10 text-zinc-100 hover:bg-white/20">
                  {skill}
                </Badge>
              ))}
            </div>
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-zinc-100">
                <Wrench className="size-4 text-cyan-200" />
                Software Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.softwareList.map((software) => (
                  <Badge
                    key={software}
                    variant="outline"
                    className="border-white/20 text-zinc-300"
                  >
                    {software}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
