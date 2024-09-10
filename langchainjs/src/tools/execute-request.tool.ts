import { GraphState, openai } from "../langgraph-template";

/**
 * @param {GraphState} state
 */
export async function executeRequest(
  state: GraphState
): Promise<Partial<GraphState>> {
  const { params, bestApi } = state;
  if (!bestApi) {
    throw new Error("No best API found");
  }

  let response: any = null;
  try {
    if (!params) {
      const fetchRes = await fetch(bestApi.api_url, {
        method: bestApi.method,
      });
      response = fetchRes.ok ? await fetchRes.json() : await fetchRes.text();
    } else {
      let fetchOptions: Record<string, any> = {
        method: bestApi.method,
      };
      let parsedUrl = bestApi.api_url;

      const paramKeys = Object.entries(params);
      paramKeys.forEach(([key, value]) => {
        if (parsedUrl.includes(`{${key}}`)) {
          parsedUrl = parsedUrl.replace(`{${key}}`, value);
          delete params[key];
        }
      });

      const url = new URL(parsedUrl);

      if (["GET", "HEAD"].includes(bestApi.method)) {
        Object.entries(params).forEach(([key, value]) =>
          url.searchParams.append(key, value)
        );
      } else {
        fetchOptions = {
          ...fetchOptions,
          body: JSON.stringify(params),
        };
      }

      const fetchRes = await fetch(url, fetchOptions);
      response = fetchRes.ok ? await fetchRes.json() : await fetchRes.text();
    }
    console.log(response, "response");

    if (response) {
      return {
        response,
      };
    }
  } catch (e) {
    console.error("Error fetching API");
    console.error(e);
  }

  return {
    response: null,
  };
}

// (async () => {
//   await executeRequest({
//     llm: openai,
//     query:
//       "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.",
//     categories: [],
//     apis: [],
//     bestApi: {
//       id: "a7c44eb0-c7f2-446a-b57e-45d0f629c50c",
//       category_name: "Data",
//       tool_name: "whatsapp data",
//       api_name: "Fetch business data",
//       api_description:
//         "The endpoint will provide: `description`, `website`, `email`, `business hours`, `address` and `category`; if the number is a whatsapp for business account.",
//       required_parameters: [
//         {
//           name: "phone",
//           type: "NUMBER",
//           description: "",
//           default: "34655719560",
//         },
//       ],
//       optional_parameters: [],
//       method: "GET",
//       template_response: {
//         message: "str",
//       },
//       api_url: "https://whatsapp-data.p.rapidapi.com/bizinfo",
//     },
//     params: {
//       phone: "9876543210",
//     },
//     response: null,
//   });
// })();
