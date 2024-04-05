import {
  ChatPromptTemplate,
  PromptTemplate,
  MessagesPlaceholder,
  FewShotPromptTemplate,
} from "@langchain/core/prompts";

(async ()=>{
  // const prompt = ChatPromptTemplate.fromMessages([
  //   ["system", "You are very powerful assistant, but don't know current events"],
  //   ["human", "{input}"],
  //   new MessagesPlaceholder("agent_scratchpad"),
  // ]);
  // console.log("🚀 ~ prompt:", prompt);


  // const template = "Write a title for a Youtube video about {content} with {style} style"
  // const prompt_template = PromptTemplate.fromTemplate(template);
  // const t  = await prompt_template.format({content: "Deep Learning in 1 minutes", style: "funny"})
  // console.log("🚀 ~ t:", t)


  const examples = [
      {
          "command": "Turn on the kitchen light",
          "action": "turn on",
          "object": "light",
          "location": "kitchen",
          "value": "",
      },
      {
          "command": "Turn off the TV in the living room",
          "action": "turn off",
          "object": "TV",
          "location": "living room",
          "value": "",
      },
      {
          "command": "Increase the bedroom temperature by 2 degrees",
          "action": "Increase temperture",
          "object": "air-conditional",
          "location": "bed room",
          "value": "2 degrees",
      },
  ];
  const example_formatter_template = `
      Input command from user: {command}
      The information extracted from above command:\n
      ----
      Action: {action}\n
      Object: {object}\n
      Location: {location}\n
      Value: {value}\n
  `;

  const example_prompt = PromptTemplate.fromTemplate(
    example_formatter_template,
  )
  const few_shot_prompt = new FewShotPromptTemplate({
    examples:  examples,
    examplePrompt: example_prompt,
    
    prefix: "Extract the detail information for an IoT input command. Return the corresponding action, object, location and value. Below are some examples:",
    
    suffix:"Input command from user: {command}\nThe information extracted from above command::",
    
    inputVariables:["command"],
    exampleSeparator:"\n\n"
  });
  const t = await few_shot_prompt.format({command:"Turn off the bath room light"});
  console.log("🚀 ~ t:", t);

  
})()