import ZAI from 'z-ai-web-dev-sdk';

async function searchGSI() {
  try {
    const zai = await ZAI.create();
    
    const result = await zai.functions.invoke('web_search', {
      query: 'GSI Tech Bangladesh address contact Dhaka office',
      num: 5
    });
    
    console.log(JSON.stringify(result, null, 2));
  } catch (error: unknown) {
    console.error('Error:', error);
  }
}

searchGSI();
