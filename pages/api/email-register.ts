// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { cwd } from "process";

type Data = {
  email: string;
  eventId: string;
};
type NextApiRequestRegisterEmail = NextApiRequest & Data;

function buildPath() {
  const dir = cwd();
  return path.join(dir, "data", "data.json");
}
function extractData(filePath: string) {
  const dataJson = fs.readFileSync(filePath);
  const data = JSON.parse(dataJson as unknown as string);
  return data;
}

export default function handler(
  req: NextApiRequestRegisterEmail,
  res: NextApiResponse
) {
  const { method, body } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({ status: 404, message: "no events" });
  }

  if (method === "POST") {
    // add code
    const { email, eventId } = body;

    if(!email||!email.includes("a")){
      res.status(422).json({message:"Invalid email address"})
      return 
    }

    const newAllEvents = allEvents.map((ev: any) => {
      if (ev.id !== eventId) return ev;
      if (ev.emails_registered.includes(email)) {
        res.status(409).json({ message: "email already has been registered" });
        return ev;
      }
      return { ...ev, emails_registered: [...ev.emails_registered, email] };
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({message:`your email registered successfully, email:${email} for the event: ${eventId}`});
  }
  if (method === "GET") {
    // add code
  }
}
