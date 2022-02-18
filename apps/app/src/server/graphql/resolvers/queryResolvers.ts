import {
  QueryResolvers,
  SearchProfilesResult,
} from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError, logSupabaseData } from "../../../supabase/pql";
import {
  createProfile,
  createSearchProfilesResult,
} from "../../../supabase/pql/profiles";
import { createTeam } from "../../../supabase/pql/teams";

export const profileQueryResolvers: QueryResolvers = {
  async getUserProfile(parent, args, { user }) {
    return await supabase
      .from("profiles")
      .select("*")
      .match({ id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0]));
  },
  searchProfiles(parent, { input }) {
    let filter: string[] = [];
    if (input.uid !== undefined) filter.push(`uid.ilike.%${input.uid}%`);
    if (input.name !== undefined) filter.push(`name.ilike.%${input.name}%`);

    let postgrestFilterBuilder = supabase
      .from("profiles")
      .select("*", { count: "exact" });
    if (input.limit) postgrestFilterBuilder.limit(input.limit);
    return postgrestFilterBuilder
      .or(filter.join(","))
      .then(handleSupabaseError)
      .then(logSupabaseData)
      .then(({ data, count }) =>
        createSearchProfilesResult(data, count)
      ) as Promise<SearchProfilesResult>;
  },
};

export const teamQueryResolvers: QueryResolvers = {
  async getTeam(parent, { tid }, { user }) {
    return await supabase
      .from("teams")
      .select("*")
      .match({ tid })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));
  },
};
