# az cognitiveservices account deployment list \
# --subscription 1bd6f57f-967b-4aed-a90f-d13ad8d84ffe \
# --resource-group langchain \
# --name diberry-langchain


az cognitiveservices account deployment list \
  --subscription 1bd6f57f-967b-4aed-a90f-d13ad8d84ffe \
  --resource-group langchain \
  --name diberry-langchain \
  --query "[].{Name:name}" \
  --output table

# az cognitiveservices account deployment show \
# --subscription 1bd6f57f-967b-4aed-a90f-d13ad8d84ffe \
# --resource-group langchain \
# --name diberry-langchain \
# --deployment-name text-embedding-ada-002

# az cognitiveservices account deployment show \
# --subscription 1bd6f57f-967b-4aed-a90f-d13ad8d84ffe \
# --resource-group langchain \
# --name diberry-langchain \
# --deployment-name gpt-4o-mini