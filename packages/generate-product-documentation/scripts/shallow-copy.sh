# Initialize a new Git repository
git init

# Set the repository URL
git remote add origin https://github.com/microsoft/typespec/

# Enable sparse-checkout
git sparse-checkout init --cone

# Specify the subdirectory you want to clone
git sparse-checkout set website/src/content

# Pull the repository
git pull origin main