Clustering using K-Means algorithm that paired with PCA for dimensionality reduction
Pros :
- Can make clusters with similar proportion
Cons :
- Distribution of clusters isn't clearly separated, either in plot 2d or 3d
- It's a challenge to find a good combination of a PCA components and the number of its k cluster in K-Means

Steps on how to use K-Means algorithm, along with PCA :
1. Pick and choose a dataset that has been cleaned
2. Encode the categorical feature or drop it
3. Normalize each columns on dataset
4. Apply PCA
5. Plot varians accumulative of each components or plot eigen value of each components
6. Determine the amount of components when its eigenvalue more than 1 or adjust to its varians
7. Apply K-Means
8. Plot WCSS
9. Determine the best K for clustering 
10. Evaluate the result by some clustering validity indices
11. Save the result to CSV
